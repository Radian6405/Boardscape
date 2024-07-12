CREATE DATABASE boardscape;

CREATE TABLE user_data (
    user_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(16) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL
);