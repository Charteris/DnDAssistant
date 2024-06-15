create table Users (
  id identity primary key,
  name varchar(255),
  birth_date date
);

insert into Users (name, birth_date) values ('Charteris', '2001-06-06');
insert into Users (name, birth_date) values ('Crews', '2001--03');