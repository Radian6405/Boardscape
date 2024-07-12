import express, { Express, Request, Response } from "express";
import pool from "./db.js";
import cors from "cors";
import dotenv from "dotenv";
import Routes from "./routes/index";

const app: Express = express();
const PORT: number = Number(process.env.SERVER_PORT ?? 8000);

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(Routes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
