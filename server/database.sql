CREATE DATABASE boardscape;

CREATE TABLE user_data (
    user_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(16) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL
);

CREATE TABLE tictactoe_room_data (
    room_id SERIAL NOT NULL PRIMARY KEY,
    room_code VARCHAR(6) UNIQUE NOT NULL,
    is_game_started BOOLEAN
);