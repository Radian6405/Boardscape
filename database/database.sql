CREATE TABLE user_data (
    user_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(16) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    avatar_text VARCHAR(3) NOT NULL,
    avatar_color CHAR(7) NOT NULL,
    avatar_rotation INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE room_data (
    room_id SERIAL NOT NULL PRIMARY KEY,
    room_code VARCHAR(6) UNIQUE NOT NULL,
    is_game_started BOOLEAN NOT NULL,
    game VARCHAR(24) NOT NULL
);

CREATE TABLE tictactoe_board_data (
    board_id SERIAL NOT NULL PRIMARY KEY,
    room_id INTEGER REFERENCES room_data ON DELETE CASCADE NOT NULL ,
    board BOOLEAN[][]
);