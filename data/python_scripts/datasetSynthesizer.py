import csv
import random

locations = [
    'Dagdusheth Halwai Ganpati Temple', 'Parvati Hill Temple', 'Pataleshwar Cave Temple', 'Chaturshringi Temple', 'Kasba Ganpati Temple',
    'Laxmi Road', 'Tulsi Baug', 'Fashion Street', 'Mahatma Phule Mandai', 'Hong Kong Lane',
    'Saras Baug', 'Empress Garden', 'Kamala Nehru Park', 'Pune Okayama Friendship Garden', 'Peshwa Udyan',
    'Rajiv Gandhi Zoological Park', 'Bund Garden', 'Baner Pashan Biodiversity Park', 'Tathawade Park', 'Shunyo Park',
    'Rajiv Gandhi Zoological Park', 'Peshwe Udyan Zoo', 'Sambhaji Park',
    'Shaniwar Wada', 'Aga Khan Palace', 'Lal Mahal', 'Vishrambaug Wada', 'Shinde Chhatri',
    'Sinhagad Fort', 'Raja Dinkar Kelkar Museum', 'Osho Ashram', 'Katraj Snake Park', 'Mulshi Lake and Dam'
]

experiences = [
    'Very spiritual and peaceful', 'Great for shopping', 'Beautiful garden with a serene atmosphere',
    'Amazing variety of animals', 'Rich historical significance', 'Scenic and tranquil',
    'Busy and bustling', 'Family-friendly', 'Well-connected', 'Developing area'
]

with open('feedback_dataset.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['id', 'location_name', 'experience', 'safety_level'])

    for i in range(1, 1001):
        location = random.choice(locations)
        experience = random.choice(experiences)
        safety_level = random.randint(1, 5)
        writer.writerow([i, location, experience, safety_level])

print("CSV file with 1000 entries has been created successfully.")
