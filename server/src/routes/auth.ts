import { Router, Request, Response, NextFunction } from "express";
import {
  aucthenticateToken,
  comparePassword,
  generateAccessToken,
  hashPassword,
} from "../util/authHelpers";
import pool from "../db";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(200).send("hello");
});

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;

    //data validation
    const usernameCheck = /^[A-Za-z0-9_.]{6,16}$/;
    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordCheck = /^[\S]{6,256}$/;

    if (!usernameCheck.test(username)) {
      res.status(401).send({ message: "Invalid Username" });
      return;
    }
    if (!emailCheck.test(email)) {
      res.status(401).send({ message: "Invalid Email address" });
      return;
    }
    if (!passwordCheck.test(password)) {
      res.status(401).send({ message: "Invalid Password" });
      return;
    }

    // username availability check
    const findUserUsername = await pool.query(
      "SELECT * FROM user_data WHERE username = $1",
      [username]
    );
    if (findUserUsername.rowCount === null || findUserUsername.rowCount > 0) {
      res.status(401).send({ message: "Username already taken" });
      return;
    }

    // email availability check
    const findUserEmail = await pool.query(
      "SELECT * FROM user_data WHERE email = $1",
      [email]
    );
    if (findUserEmail.rowCount === null || findUserEmail.rowCount > 0) {
      res.status(401).send({ message: "Email address already exists" });
      return;
    }

    next();
  },
  async (req: Request, res: Response) => {
    try {
      const { username, password, email } = req.body;

      const hashedPassword: string = hashPassword(password);

      const newUser = await pool.query(
        "INSERT INTO user_data(username, email, password) VALUES($1,$2,$3) RETURNING *",
        [username, email, hashedPassword]
      );

      res
        .status(201)
        .send({ token: generateAccessToken(newUser.rows[0].user_id) });
    } catch (error) {
      console.log(error);
    }
  }
);

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
    } else {
      res.status(401).send({
        message:
          "Invalid credentials. Please check your username and password and try again.",
      });
    }
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
