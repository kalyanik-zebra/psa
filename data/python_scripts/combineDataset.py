# import pandas as pd

# # Load datasets
# feedback_df = pd.read_csv('dataset_cor.csv')
# # locations_df = pd.read_csv('locations.csv')

# # # Merge latitude and longitude into feedback dataset
# # merged_df = feedback_df.merge(
# #     locations_df.rename(columns={"Address": "location_name", "Latitude": "lat", "Longitude": "lon"}),
# #     on="location_name",
# #     how="left"
# # )

# # # Save the updated dataset
# # merged_df.to_csv('feedback_dataset_full_with_coordinates.csv', index=False)


# print(feedback_df.columns)
# feedback_df = feedback_df[['id', 'location_name', 'lat', 'lon', 'experience', 'safety_level']]

# print(feedback_df.columns)

# feedback_df.to_csv('dataset_cor.csv', index=False)


import pandas as pd
import requests
import time
import warnings

# df = pd.read_csv('updated_dataset_cor.csv')
# un = df.drop_duplicates(subset=['location name'])

# inp = df['location name'].unique().tolist()
# # print(inp, len(inp))

# headers = {
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
#     "Referer": "https://www.google.com"  # Add a Referer header
# }
# warnings.filterwarnings("ignore", message="Unverified HTTPS request")

# def fetch_with_retries(session, url, headers, max_retries=5):
#     for attempt in range(max_retries):
#         try:
#             res = session.get(url, headers=headers, verify=False)
#             if res.status_code == 200:
#                 return res
#             elif res.status_code == 403:
#                 print("Error: Access forbidden. Retrying...")
#             else:
#                 print(f"Error: Received status code {res.status_code}. Retrying...")
#         except requests.exceptions.RequestException as e:
#             print(f"Error fetching data: {e}. Retrying...")
#         time.sleep(2 ** attempt)  # Exponential backoff
#     return None

# locations = {}

# # with requests.Session() as session:
# #     for address in inp:
# #         url = f"https://nominatim.openstreetmap.org/search?q={address}&format=json"
# #         response = fetch_with_retries(session, url, headers)
# #         if response:
# #             try: 
# #                 data = response.json()
# #                 if data:
# #                     location = data[0]
# #                     locations[address] = (location['name'], location['display_name'], location['addresstype'])
# #                 else:
# #                     locations[address] = (None, None)
# #             except ValueError:
# #                 print(f"Error: Response for {address} is not valid JSON.")
# #                 locations[address] = (None, None)
# #         else:
# #             print(f"Failed to fetch data for {address}.")
# #             locations[address] = (None, None)
# #         time.sleep(3) 

# # print(locations)


# location_df = pd.DataFrame.from_dict(locations, orient='index', columns=['name', 'display_name', 'addresstype']).reset_index()
# location_df.rename(columns={'index': 'location name'}, inplace=True)
# location_df = location_df[['location name', 'display_name', 'addresstype']]
# un = un[['location name', 'safety_level']]

# merged_df = pd.merge( location_df, un,  on='location name', how='left')
# merged_df.to_csv('merged_dataset.csv', index=False)
# # print(merged_df)

# merged_df = pd.read_csv('merged_dataset.csv')

# tuples_of_tuples = tuple(merged_df.itertuples(index=False, name=None))

# # Print the result
# print(tuples_of_tuples)

# # Generate the SQL INSERT statement


# sql_insert = "INSERT INTO locations (location_name, display_name, addresstype, safety_level) VALUES "

# # Convert tuples of tuples into SQL-compatible string
# values = ", ".join(str(row) for row in tuples_of_tuples)

# # Combine the SQL statement with the values
# sql_insert += values + ";"

# # Print the SQL statement
# print(sql_insert)

# Read the merged dataset with a specified encoding
merged_df = pd.read_csv('merged_dataset.csv', encoding='latin1')

# Convert the DataFrame rows into tuples
tuples_of_tuples = tuple(merged_df.itertuples(index=False, name=None))

# Print the result
# print(tuples_of_tuples)

# Generate the SQL INSERT statement
sql_insert = "INSERT INTO locations (location_name, display_name, addresstype, safety_level) VALUES "

# Convert tuples of tuples into SQL-compatible string
values = ", ".join(str(row) for row in tuples_of_tuples)

# Combine the SQL statement with the values
sql_insert += values + ";"

# Print the SQL statement
print(sql_insert)



# INSERT INTO locations (location_name, display_name, addresstype, safety_level) VALUES 
# ('Peshwe Udyan Zoo', 'Shrimant Thorale Bajirao Peshwe Road, Shukrawar Peth, Maharashtra 411030 8.7 km', 'park', 3), 
# ('Shinde Chhatri', 'Shinde Chhatri, Mahadji Shinde Path, Wanawadi, Pune City, Pune, Maharashtra, 411040, India', 'tourism', 2), 
# ('Rajiv Gandhi Zoological Park', 'Pune-Satara Road, Opp. Katraj Dairy, Katraj, Pune, Maharashtra 411046', 'park', 3), 
# ('Empress Garden', 'Empress Garden, Broadmoor, Richmond, Metro Vancouver Regional District, British Columbia, V6Y, Canada', 'residential', 3), 
# ('Saras Baug', 'Saras Baug, Deonar, M/E Ward, Zone 5, Mumbai Suburban, Maharashtra, 400088, India', 'park', 2), 
# ('Hong Kong Lane', 'Hongkong Ln, Pulachi Wadi, Deccan Gymkhana, Pune, Maharashtra 411004, India, Pune, Maharashtra 411004', 'market', 3), 
# ('Tathawade Park', 'Major Tathawade Udyan, Moraya Krupa Society, Karve Nagar, Anandnagar, Pune City, Pune, Maharashtra, 411051, India', 'park', 3), 
# ('Shaniwar Wada', 'Shaniwar Wada, Shivaji Road, Kasba Peth, Pune City, Pune, Maharashtra, 411002, India', 'historic', 3),
# ('Mahatma Phule Mandai', 'Mahatma Phule Mandai, Amrale Road, Guruwar Peth, Pune City, Pune, Maharashtra, 411002, India', 'amenity', 1), 
# ('Bund Garden', 'Bund Garden, Bund Garden Road, Bund Garden T.P.S, Pune City, Pune, Maharashtra, 411001, India', 'railway', 3), 
# ('Kasba Ganpati Temple', 'Ganpati Temple, Rashtrabhasha Bhavan Marg, Narayan Peth, Pune City, Pune, Maharashtra, 411030, India', 'amenity', 1), 
# ('Lal Mahal', 'Lal Mahal, Rupbas, Rupbas Tehsil, Bharatpur, Rajasthan, 321404, India', 'locality', 4),
# ('Sambhaji Park', 'Sambhaji Park, Shaniwar Peth, Pune City, Pune, Maharashtra, 411030, India', 'park', 2), 
# ('Osho Ashram', 'Osho Ashram, Lane 1, Koregaon Park, Ghorpuri, Pune City, Pune, Maharashtra, 411001, India', 'amenity', 4), 
# ('Shunyo Park', 'Shunyo Park or Shunyo Garden is a 12-acre Zen garden in the Osho Ashram at Koregaon Park, Pune, India', 'park', 1), 
# ('Chaturshringi Temple', 'Senapati Bapat Road, Pune, Maharashtra 411016 11 km', 'temple', 2), 
# ('Parvati Hill Temple', 'Nana Saheb Peshwa Rd, Parvati Hills, Parvati Paytha, Pune, Maharashtra 411009 9.3 km', 'temple', 3), 
# ('Pataleshwar Cave Temple', 'Pataleshwar cave temple, Jangli Maharaj Path, Shivajinagar, Pune City, Pune, Maharashtra, 411002, India', 'amenity', 2), 
# ('Kamala Nehru Park', 'Kamala Nehru Park, Malabar Hill, D Ward, Zone 1, Mumbai City, Maharashtra, India', 'park', 3), 
# ('Mulshi Lake and Dam', 'Mulshi, Pune, Maharashtra 412108', 'landmark', 1), ('Vishrambaug Wada', 'Vishrambaug Wada, R. B. Kumthekar Marg, Narayan Peth, Pune City, Pune, Maharashtra, 411030, India', 'building', 2), 
# ('Tulsi Baug', 'Tulsi Udyan, Reshimbag, Mahal, Nagpur City, Nagpur Urban Taluka, Nagpur, Maharashtra, India', 'park', 4), 
# ('Peshwa Udyan', 'Shrimant Thorale Bajirao Peshwe Road, Shukrawar Peth, Maharashtra 411030 8.7 km', 'park', 4), 
# ('Sinhagad Fort', 'Sinhagad Fort, Sinhagad Ghat Road, Kalyan Gaon, Haveli, Pune, Maharashtra, 415115, India', 'historic', 3), 
# ('Raja Dinkar Kelkar Museum', 'Raja Dinkar Kelkar Museum, Raja Dinkar Kelkar Sangrahalay Path, Shukrawar Peth, Pune City, Pune, Maharashtra, 411002, India', 'tourism', 4),
# ('Pune Okayama Friendship Garden', 'Okayama Friendship Garden, Sahakar Nagar, Anandnagar, Pune City, Pune, Maharashtra, 411051, India', 'park', 4), 
# ('Fashion Street', 'Fashion Street, Spitalfields, Whitechapel, London Borough of Tower Hamlets, London, Greater London, England, E1 6PX, United Kingdom', 'road', 1), ('Aga Khan Palace', 'Aga Khan Palace, Nagar Road, Kalyani Nagar, Pune, Maharashtra, 411011, India', 'tourism', 2), ('Laxmi Road', 'Laxmi Road, Ganesh Peth, Pune City, Pune, Maharashtra, 411002, India', 'road', 4), ('Baner Pashan Biodiversity Park', '49/7, Sus Goan Road, Pune, Maharashtra 411021', 'park', 4), ('Katraj Snake Park', 'Rajiv Gandhi Snake Park, Katraj, Pune City, Pune, Maharashtra, 411046, India', 'park', 3), ('Dagdusheth Halwai Ganpati Temple', 'Ganpati Bhavan, 250, Budhvar Peth, Pune, Maharashtra 411002', 'temple', 4), ('Baner', 'Baner, Pune City, Pune, Maharashtra, 511045, India', 'suburb', 2), ('Deccan Gymkhana', 'Deccan Gymkhana, Pune City, Pune, Maharashtra, 411004, India', 'suburb', 2), ('Pashan', 'Pashan, Pune City, Pune, Maharashtra, 411008, India', 'suburb', 3), ('Kharadi', 'Kharadi, Pune City, Pune, Maharashtra, 411014, India', 'suburb', 4), ('Aundh', 'Aundh, Pune City, Pune, Maharashtra, 411027, India', 'suburb', 4), ('Bibwewadi', 'Sitaram Abaji Bibwe School, Bibwewadi Otta,, Sitaram Abaji Bibve Path, Panchavati, Pune City, Pune, Maharashtra, 411037, India', 'building', 4), ('Hadapsar', 'Hadapsar, Pune City, Pune, Maharashtra, 411028, India', 'locality', 3), ('Koregaon Park', 'Koregaon Park, Ghorpuri, Pune City, Pune, Maharashtra, India', 'residential', 4), ('Magarpatta', 'Magarpatta City School Ground, Pune City, Pune, Maharashtra, India', 'park', 3), ('Kothrud', 'Kothrud, Anandnagar, Pune City, Pune, Maharashtra, 411038, India', 'suburb', 4), ('Bavdhan', 'Bavdhan, Pune City, Pune, Maharashtra, 411021, India', 'suburb', 1), ('Swargate', 'Sarasbaug, swargate, Swargate, Pune City, Pune, Maharashtra, 411009, India', 'park', 1), ('Camp', 'Camp County, Texas, United States', 'county', 4), ('Dhankawadi', 'Government Hospital, Dhankawadi, Internal Mohan Nagar Road, Katraj, Pune City, Pune, Maharashtra, 411043, India', 'amenity', 2), ('Hinjewadi', 'ChargeGrid Charging Station, Phase 3 International Tech Park, Hinjewadi Rajiv Gandhi Infotech Park, Hinjawadi, Juniper, Maharashtra 411057, iGATE - Hinjawadi Road, Hinjawadi Phase 3, Mulshi, Pune, Maharashtra, 411057, India', 'building', 4), ('Shivaji Nagar', 'Shivaji Nagar, Samastipur, Bihar, India', 'county', 4), ('Pimple Saudagar', 'Pimple Saudagar, Pimpri-Chinchwad, Haveli, Pune, Maharashtra, 431027, India', 'suburb', 1), ('Viman Nagar', 'Viman Nagar, Rasoolpura, Tirumalagiri mandal, Hyderabad, Telangana, 500003, India', 'neighbourhood', 2), ('Wakad', 'Wakad, Mulshi, Pune, Maharashtra, 411027, India', 'suburb', 3), 
# ('Yerawada', 'Yerawada, Jail Press Road, Ward 6, Pune City, Pune, Maharashtra, 411032, India', 'amenity', 3);



data = pd.read_csv("../dataset/updated_dataset_cor.csv")

