import express, { Express, Request, Response } from "express";
import pool from "./db.js";
import cors from "cors";
import dotenv from "dotenv";

const app: Express = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT: number = Number(process.env.SERVER_PORT ?? 8000);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("hello");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
