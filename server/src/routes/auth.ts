import { Router, Request, Response } from "express";
import {
  aucthenticateToken,
  comparePassword,
  generateAccessToken,
  hashPassword,
} from "../util/authHelpers";
import pool from "../db";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(200).send("hello");
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword: string = hashPassword(password);

    const newUser = await pool.query(
      "INSERT INTO user_data(username, password) VALUES($1,$2) RETURNING *",
      [username, hashedPassword]
    );

    res
      .status(201)
      .send({ token: generateAccessToken(newUser.rows[0].user_id) });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const findUser = await pool.query(
      "SELECT * FROM user_data WHERE username = $1",
      [username]
    );

    if (
      Number(findUser.rowCount) > 0 &&
      comparePassword(password, findUser.rows[0].password)
    ) {
      res
        .status(200)
        .send({ token: generateAccessToken(findUser.rows[0].user_id) });
    } else res.status(401).send("invalid creds");
  } catch (error) {
    console.log(error);
  }
});

router.get(
  "/status",
  aucthenticateToken,
  async (req: Request, res: Response) => {
    if (req.user === null) {
      res.sendStatus(401);
      return;
    }
    try {
      res.send(req.user);
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
