
# Boardscape
Boardscape is an online multiplayer platform where you can connect with friends to play a wide variety of board games.


## Tech Stack

**Client:** 
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**Server:**
* ![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
* ![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
* ![Socketio](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)
* ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
* ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)


## Screenshots
![Screenshot 2024-08-25 000202](https://github.com/user-attachments/assets/a5b901c7-0fee-41df-9ff9-674f7a70b721)

## Installation

### Backend & Database

1. Install [`Docker` ](https://www.docker.com/)
2. Create a `.env` file in the root directory and fill it with the following details:
    ```
    SERVER_HOST=server-c
    SERVER_PORT=8000

    POSTGRES_HOST=postgres-c
    POSTGRES_PORT=5000

    POSTGRES_USER=<postgres username>
    POSTGRES_PASSWORD=<postgres password>
    POSTGRES_DB=boardscape

    JWT_TOKEN_SECRET=<jtw token secret>

    GOOGLE_OAUTH_CLIENT_ID=<your google client ID>
    GOOGLE_OAUTH_CLIENT_SECRET=<your google client secret>
    ```
3. Run `docker-compose --env-file .env up` in the same directory

4. Docker containers should start running your `server` & `database`

### Frontend

1. Install dependencies 
    ```bash
    cd client
    npm install
    ```

2.  Run ```npm run dev``` to start the server.

3.  Your frontend server should be running run on [http://127.0.0.1:5173](http://127.0.0.1:5173/).
