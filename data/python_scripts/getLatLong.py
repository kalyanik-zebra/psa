import requests
import warnings
import time
import csv

# Correct the formatting of the list
df = [
    'Peshwe Udyan Zoo', 'Shinde Chhatri', 'Rajiv Gandhi Zoological Park',
    'Empress Garden', 'Saras Baug', 'Hong Kong Lane', 'Tathawade Park',
    'Shaniwar Wada', 'Mahatma Phule Mandai', 'Bund Garden',
    'Kasba Ganpati Temple', 'Lal Mahal', 'Sambhaji Park', 'Osho Ashram',
    'Shunyo Park', 'Chaturshringi Temple', 'Parvati Hill Temple',
    'Pataleshwar Cave Temple', 'Kamala Nehru Park', 'Mulshi Lake and Dam',
    'Vishrambaug Wada', 'Tulsi Baug', 'Peshwa Udyan', 'Sinhagad Fort',
    'Raja Dinkar Kelkar Museum', 'Pune Okayama Friendship Garden',
    'Fashion Street', 'Aga Khan Palace', 'Laxmi Road',
    'Baner Pashan Biodiversity Park', 'Katraj Snake Park',
    'Dagdusheth Halwai Ganpati Temple', 'Baner', 'Deccan Gymkhana', 'Pashan',
    'Kharadi', 'Aundh', 'Bibwewadi', 'Hadapsar', 'Koregaon Park', 'Magarpatta',
    'Kothrud', 'Bavdhan', 'Swargate', 'Camp', 'Dhankawadi', 'Hinjewadi',
    'Shivaji Nagar', 'Pimple Saudagar', 'Viman Nagar', 'Wakad', 'Yerawada'
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Referer": "https://www.google.com"  # Add a Referer header
}

warnings.filterwarnings("ignore", message="Unverified HTTPS request")

def fetch_with_retries(session, url, headers, max_retries=5):
    for attempt in range(max_retries):
        try:
            res = session.get(url, headers=headers, verify=False)
            if res.status_code == 200:
                return res
            elif res.status_code == 403:
                print("Error: Access forbidden. Retrying...")
            else:
                print(f"Error: Received status code {res.status_code}. Retrying...")
        except requests.exceptions.RequestException as e:
            print(f"Error fetching data: {e}. Retrying...")
        time.sleep(2 ** attempt)  # Exponential backoff
    return None

# Create an empty dictionary for storing location data
locations = {}

with requests.Session() as session:
    for address in df:
        url = f"https://nominatim.openstreetmap.org/search?q={address}&format=json"
        response = fetch_with_retries(session, url, headers)
        if response:
            try: 
                data = response.json()
                if data:
                    location = data[0]
                    locations[address] = (location['lat'], location['lon'])
                else:
                    locations[address] = (None, None)
            except ValueError:
                print(f"Error: Response for {address} is not valid JSON.")
                locations[address] = (None, None)
        else:
            print(f"Failed to fetch data for {address}.")
            locations[address] = (None, None)
        time.sleep(3) 

# Write the results to a CSV file
output_file = "locations.csv"
with open(output_file, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["Address", "Latitude", "Longitude"])
    for address, coords in locations.items():
        writer.writerow([address, coords[0], coords[1]])

print(f"Location data saved to {output_file}.")