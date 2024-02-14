--Command to create 'users' table
--Three columns: id, which will auto increment and function as the primary key
--And then a first_name and last_name column that are varchar's less than 100 and last name 
--cannot be null.

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100) NOT NULL
);

-- CREATE TABLE users (
--   id SERIAL,
--   first_name VARCHAR(100),
--   last_name VARCHAR(100),
--   PRIMARY KEY (id),
--   CONSTRAINT last_name_not_null CHECK (last_name IS NOT NULL) //last_name != null
-- );

--fails because last_name would be null
INSERT INTO users (first_name) VALUES ('Cody');


INSERT INTO users (last_name) VALUES ('Smith');

--write a query to select all rows with last name Smith
SELECT * 
FROM users 
WHERE last_name = 'Smith';

--write a query to select all rows with last name Smith and non null first name
SELECT *
FROM users
WHERE last_name = 'Smith' AND first_name IS NOT NULL; 

CREATE TABLE VehicleModelYear (
    id SERIAL PRIMARY KEY,
    make VARCHAR(255),
    model VARCHAR(255),
    year INTEGER,
    price DECIMAL(10, 2)
);
