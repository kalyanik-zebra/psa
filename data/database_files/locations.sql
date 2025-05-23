 use psa;
 create table locations (
 id int auto_increment primary key, 
 location_name varchar(250) not null,
 display_name varchar(250) not null,
 addresstype varchar(250) not null,
  safety_level int not null
 );
 drop table locations;
 desc locations;
 
INSERT INTO locations (location_name, display_name, addresstype, safety_level) VALUES 
('Peshwe Udyan Zoo', 'Shrimant Thorale Bajirao Peshwe Road, Shukrawar Peth, Maharashtra 411030 · 8.7 km', 'park', 3),
('Shinde Chhatri', 'Shinde Chhatri, Mahadji Shinde Path, Wanawadi, Pune City, Pune, Maharashtra, 411040, India', 'tourism', 2),
('Rajiv Gandhi Zoological Park', 'Pune-Satara Road, Opp. Katraj Dairy, Katraj, Pune, Maharashtra 411046', 'park', 3),
('Empress Garden', 'Empress Garden, Broadmoor, Richmond, Metro Vancouver Regional District, British Columbia, V6Y, Canada', 'residential', 3),
('Saras Baug', 'Saras Baug, Deonar, M/E Ward, Zone 5, Mumbai Suburban, Maharashtra, 400088, India', 'park', 2),
('Hong Kong Lane', 'Hongkong Ln, Pulachi Wadi, Deccan Gymkhana, Pune, Maharashtra 411004, India, Pune, Maharashtra 411004', 'market', 3),
('Tathawade Park', 'Major Tathawade Udyan, Moraya Krupa Society, Karve Nagar, Anandnagar, Pune City, Pune, Maharashtra, 411051, India', 'park', 3),
('Shaniwar Wada', 'Shaniwar Wada, Shivaji Road, Kasba Peth, Pune City, Pune, Maharashtra, 411002, India', 'historic', 3),
('Mahatma Phule Mandai', 'Mahatma Phule Mandai, Amrale Road, Guruwar Peth, Pune City, Pune, Maharashtra, 411002, India', 'amenity', 1),
('Bund Garden', 'Bund Garden, Bund Garden Road, Bund Garden T.P.S, Pune City, Pune, Maharashtra, 411001, India', 'railway', 3),
('Kasba Ganpati Temple', 'Ganpati Temple, Rashtrabhasha Bhavan Marg, Narayan Peth, Pune City, Pune, Maharashtra, 411030, India', 'amenity', 1),
('Lal Mahal', 'Lal Mahal, Rupbas, Rupbas Tehsil, Bharatpur, Rajasthan, 321404, India', 'locality', 4),
('Sambhaji Park', 'Sambhaji Park, Shaniwar Peth, Pune City, Pune, Maharashtra, 411030, India', 'park', 2),
('Osho Ashram', 'Osho Ashram, Lane 1, Koregaon Park, Ghorpuri, Pune City, Pune, Maharashtra, 411001, India', 'amenity', 4),
('Shunyo Park', 'Shunyo Park or Shunyo Garden is a 12-acre Zen garden in the Osho Ashram at Koregaon Park, Pune, India', 'park', 1),
('Chaturshringi Temple', 'Senapati Bapat Road, Pune, Maharashtra 411016 · 11 km', 'temple', 2),
('Parvati Hill Temple', 'Nana Saheb Peshwa Rd, Parvati Hills, Parvati Paytha, Pune, Maharashtra 411009 · 9.3 km', 'temple', 3),
('Pataleshwar Cave Temple', 'Pataleshwar cave temple, Jangli Maharaj Path, Shivajinagar, Pune City, Pune, Maharashtra, 411002, India', 'amenity', 2),
('Kamala Nehru Park', 'Kamala Nehru Park, Malabar Hill, D Ward, Zone 1, Mumbai City, Maharashtra, India', 'park', 3),
('Mulshi Lake and Dam', 'Mulshi, Pune, Maharashtra 412108', 'landmark', 1),
('Vishrambaug Wada', 'Vishrambaug Wada, R. B. Kumthekar Marg, Narayan Peth, Pune City, Pune, Maharashtra, 411030, India', 'building', 2),
('Tulsi Baug', 'Tulsi Udyan, Reshimbag, Mahal, Nagpur City, Nagpur Urban Taluka, Nagpur, Maharashtra, India', 'park', 4),
('Peshwa Udyan', 'Shrimant Thorale Bajirao Peshwe Road, Shukrawar Peth, Maharashtra 411030 · 8.7 km', 'park', 4),
('Sinhagad Fort', 'Sinhagad Fort, Sinhagad Ghat Road, Kalyan Gaon, Haveli, Pune, Maharashtra, 415115, India', 'historic', 3),
('Raja Dinkar Kelkar Museum', 'Raja Dinkar Kelkar Museum, Raja Dinkar Kelkar Sangrahalay Path, Shukrawar Peth, Pune City, Pune, Maharashtra, 411002, India', 'tourism', 4),
('Pune Okayama Friendship Garden', 'Okayama Friendship Garden, Sahakar Nagar, Anandnagar, Pune City, Pune, Maharashtra, 411051, India', 'park', 4),
('Fashion Street', 'Fashion Street, Spitalfields, Whitechapel, London Borough of Tower Hamlets, London, Greater London, England, E1 6PX, United Kingdom', 'road', 1),
('Aga Khan Palace', 'Aga Khan Palace, Nagar Road, Kalyani Nagar, Pune, Maharashtra, 411011, India', 'tourism', 2),
('Laxmi Road', 'Laxmi Road, Ganesh Peth, Pune City, Pune, Maharashtra, 411002, India', 'road', 4),
('Baner Pashan Biodiversity Park', '49/7, Sus Goan Road, Pune, Maharashtra 411021', 'park', 4),
('Katraj Snake Park', 'Rajiv Gandhi Snake Park, Katraj, Pune City, Pune, Maharashtra, 411046, India', 'park', 3),
('Dagdusheth Halwai Ganpati Temple', 'Ganpati Bhavan, 250, Budhvar Peth, Pune, Maharashtra 411002', 'temple', 4),
('Baner', 'Baner, Pune City, Pune, Maharashtra, 511045, India', 'suburb', 2),
('Deccan Gymkhana', 'Deccan Gymkhana, Pune City, Pune, Maharashtra, 411004, India', 'suburb', 2),
('Pashan', 'Pashan, Pune City, Pune, Maharashtra, 411008, India', 'suburb', 3),
('Kharadi', 'Kharadi, Pune City, Pune, Maharashtra, 411014, India', 'suburb', 4),
('Aundh', 'Aundh, Pune City, Pune, Maharashtra, 411027, India', 'suburb', 4),
('Bibwewadi', 'Sitaram Abaji Bibwe School, Bibwewadi Otta,, Sitaram Abaji Bibve Path, Panchavati, Pune City, Pune, Maharashtra, 411037, India', 'building', 4),
('Hadapsar', 'Hadapsar, Pune City, Pune, Maharashtra, 411028, India', 'locality', 3),
('Koregaon Park', 'Koregaon Park, Ghorpuri, Pune City, Pune, Maharashtra, India', 'residential', 4),
('Magarpatta', 'Magarpatta City School Ground, Pune City, Pune, Maharashtra, India', 'park', 3),
('Kothrud', 'Kothrud, Anandnagar, Pune City, Pune, Maharashtra, 411038, India', 'suburb', 4),
('Bavdhan', 'Bavdhan, Pune City, Pune, Maharashtra, 411021, India', 'suburb', 1),
('Swargate', 'Sarasbaug, swargate, Swargate, Pune City, Pune, Maharashtra, 411009, India', 'park', 1),
('Camp', 'Camp County, Texas, United States', 'county', 4),
('Dhankawadi', 'Government Hospital, Dhankawadi, Internal Mohan Nagar Road, Katraj, Pune City, Pune, Maharashtra, 411043, India', 'amenity', 2),
('Hinjewadi', 'ChargeGrid Charging Station, Phase 3 International Tech Park, Hinjewadi Rajiv Gandhi Infotech Park, Hinjawadi, Juniper, Maharashtra 411057, iGATE - Hinjawadi Road, Hinjawadi Phase 3, Mulshi, Pune, Maharashtra, 411057, India', 'building', 4),
('Shivaji Nagar', 'Shivaji Nagar, Samastipur, Bihar, India', 'county', 4),
('Pimple Saudagar', 'Pimple Saudagar, Pimpri-Chinchwad, Haveli, Pune, Maharashtra, 431027, India', 'suburb', 1),
('Viman Nagar', 'Viman Nagar, Rasoolpura, Tirumalagiri mandal, Hyderabad, Telangana, 500003, India', 'neighbourhood', 2),
('Wakad', 'Wakad, Mulshi, Pune, Maharashtra, 411027, India', 'suburb', 3),
('Yerawada', 'Yerawada, Jail Press Road, Ward 6, Pune City, Pune, Maharashtra, 411032, India', 'amenity', 3);

select * from locations;

ALTER TABLE locations ADD safety_percent int AS (safety_level / 4 * 100);