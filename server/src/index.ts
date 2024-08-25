import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Routes from "./routes/index";
import { createServer } from "http";
import manageSockets from "./sockets/index.js";

const PORT: number = Number(process.env.SERVER_PORT ?? 8000);

const app: Express = express();
const httpServer = createServer(app);

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(Routes);

manageSockets(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
