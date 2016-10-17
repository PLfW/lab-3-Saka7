CREATE TYPE user_type AS ENUM ('CUSTOMER', 'FLIGHT_PROVIDER', 'ADMIN');

CREATE TABLE IF NOT EXISTS users(
  id serial PRIMARY KEY,
  type user_type NOT NULL,
  first_name varchar(40) NOT NULL CHECK(char_length(first_name) > 1),
  second_name varchar(40) NOT NULL CHECK(char_length(second_name) > 1),
  email varchar(40) NOT NULL CHECK(char_length(email) > 5),
  password text NOT NULL CHECK(char_length(password) > 5),
  phone varchar(20),
  bio text,
  image text
);

CREATE TABLE IF NOT EXISTS destinations(
  id serial PRIMARY KEY,
  country varchar(40) NOT NULL CHECK(char_length(country) > 2),
  city varchar(40) NOT NULL CHECK(char_length(city) > 2)
);

CREATE TABLE IF NOT EXISTS flights(
  id serial PRIMARY KEY,
  name varchar(40) NOT NULL,
  image text,
  description text,
  from_point serial REFERENCES destinations(id),
  to_point serial REFERENCES destinations(id),
  expiration_date date NOT NULL,
  departure timestamp NOT NULL,
  duration int NOT NULL,
  price double precision NOT NULL CHECK(price > 0.0)
);

CREATE TABLE IF NOT EXISTS orders(
  id serial PRIMARY KEY,
  user_id serial REFERENCES users(id),
  flight_id serial REFERENCES flights(id),
  applying_time timestamp NOT NULL,
  paying_time timestamp,
  rejection_time timestamp,
  is_paid boolean DEFAULT false,
  is_rejected boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS user_name_index ON users(first_name);
CREATE INDEX IF NOT EXISTS user_email_index ON users(email);
CREATE INDEX IF NOT EXISTS user_type_index ON users(type);

CREATE INDEX IF NOT EXISTS flight_name_index ON flights(name);
CREATE INDEX IF NOT EXISTS from_point_index ON flights(from_point);
CREATE INDEX IF NOT EXISTS to_point_index ON flights(to_point);
CREATE INDEX IF NOT EXISTS flight_expiration_date_index ON flights(expiration_date);
CREATE INDEX IF NOT EXISTS flight_price_index ON flights(price);

CREATE INDEX IF NOT EXISTS destination_country_index ON destinations(country);
CREATE INDEX IF NOT EXISTS destination_city_index ON destinations(city);

CREATE INDEX IF NOT EXISTS is_paid_index ON orders(is_paid);
