use psa;
CREATE TABLE feedback (
    id INT PRIMARY KEY,
    location_name VARCHAR(250) NOT NULL,
    lat double not null,
    lon double not null,
    experience VARCHAR(350) NOT NULL,
    safety_level INT NOT NULL
);
-- alter table feedback add lat double not null;
-- alter table feedback add lon double not null;
show tables;
desc feedback;
ALTER TABLE feedback ADD safety_percent int AS (safety_level / 4 * 100);

ALTER TABLE feedback MODIFY id INT AUTO_INCREMENT;
insert into feedback(id, location_name, experience, safety_level) values (2, "Karve Nagar", "Area with college students may experience theft, it is dangerous at night time.", 2);
drop table feedback;
select * from feedback;
flush table feedback;

select * from feedback;
SELECT COUNT(*) AS count FROM feedback;
alter table feedback add column info varchar(250) not null;
alter table feedback add column type varchar(250) not null;
desc feedback;
