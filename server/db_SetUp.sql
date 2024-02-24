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
---------------------------------
CREATE TABLE sedans (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale boolean
);

CREATE TABLE dealership (
  id INT,
  name VARCHAR(50),
  location VARCHAR(50),
  price_range INT
);

INSERT INTO dealership (id, name, location, price_range) VALUES (123,
'best dealer around', 'palmdale', 4);

INSERT INTO dealership (id, name, location, price_range) VALUES (124,
'auto dealer hawthorne', 'hawthorne', 2);

CREATE TABLE dealership (
    id BIGSERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range INT NOT NULL
);

ALTER TABLE dealership
ADD CONSTRAINT check_price_range
CHECK (price_range >= 1 AND price_range <= 5);

ALTER TABLE dealership
ADD CONSTRAINT id PRIMARY KEY (id);