import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Routes from "./routes/index";
import { createServer } from "http";
import manageSockets from "./sockets/index.js";
import pool from "./db";

const PORT: number = Number(process.env.SERVER_PORT ?? 8000);

const app: Express = express();
const httpServer = createServer(app);

dotenv.config({ path: "../.env" });
app.use(cors());
app.use(express.json());
app.use(Routes);

manageSockets(httpServer);

async function main() {
  const client = await pool.connect();
  try {
    const response = await client.query("SELECT * FROM user_data LIMIT 10;");
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
}

main()
  .then(() => console.log("Connected to Postgres!"))
  .catch((err) => console.log("Error connecting to Postgres", err));

httpServer.listen(PORT, process.env.SERVER_HOST, () => {
  console.log(`Server running on port ${PORT}`);
});
