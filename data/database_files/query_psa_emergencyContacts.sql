use psa;
create table contacts(id int primary key, name varchar(80), phone varchar(10));
insert into contacts values (1, 'Kalyani Kolte', '8177834839');
select * from contacts;

ALTER TABLE contacts MODIFY id INT AUTO_INCREMENT;
describe contacts;
drop table contacts;

DELETE FROM contacts WHERE id = 1;
