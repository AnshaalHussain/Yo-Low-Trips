DROP TABLE IF EXISTS flights CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS airports CASCADE;

-- Parameters from Cheapest Tickets
CREATE TABLE flights (
    id SERIAL PRIMARY KEY NOT NULL,
    origin VARCHAR(3) NOT NULL,
    destination VARCHAR(3) NOT NULL,
    price INTEGER NOT NULL,
    airline VARCHAR(2) NOT NULL,
    flight_number VARCHAR(4) NOT NULL,
    departure_at TIMESTAMP,
    return_at TIMESTAMP,
    expires_at TIMESTAMP
);

CREATE TABLE favourites (
    favId SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    origin VARCHAR(3) NOT NULL,
    destination VARCHAR(3) NOT NULL,
    price INTEGER NOT NULL,
    airline VARCHAR(2) NOT NULL,
    flight_number VARCHAR(4) NOT NULL,
    departure_at TIMESTAMP,
    return_at TEXT,
    expires_at TEXT
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY NOT NULL,
    favourite_id INTEGER REFERENCES favourites(favId) ON DELETE CASCADE,
    name VARCHAR(250),
    start_at TIMESTAMP,
    end_at TIMESTAMP
);

CREATE TABLE cities (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(250)

);

CREATE TABLE airports (
    id SERIAL PRIMARY KEY NOT NULL,
    airport_code VARCHAR(250),
    city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
    airport_name VARCHAR(250)
);
