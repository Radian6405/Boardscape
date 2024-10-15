import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../db";

dotenv.config({ path: "../../.env" });
const saltRounds: number = 10;

export const hashPassword = (password: string) => {
  const salt: string = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string) =>
  bcrypt.compareSync(plain, hashed);

export function generateAccessToken(userID: number) {
  return jwt.sign({ userID: userID }, process.env.JWT_TOKEN_SECRET as Secret, {
    expiresIn: "1d",
  });
}

export function aucthenticateToken(
  req: Request,
  res: Response,
  next: Function
) {
  const authHeader = req.headers.authorization;

  //if no token is sent
  if (authHeader === "undefined" || authHeader === undefined) {
    req.user = null;
    next();
    return;
  }

  jwt.verify(
    authHeader,
    process.env.JWT_TOKEN_SECRET as Secret,
    async (err: any, data: any) => {
      //jwt not verified
      if (err) {
        req.user = null;
        next();
      }

      const findUser = await pool.query(
        "SELECT * FROM user_data WHERE user_id = $1",
        [data.userID]
      );

      //no user found
      if (Number(findUser.rowCount) == 0) {
        req.user === null;
        next();
        return;
      }

      // user found
      req.user = {
        user_id: findUser.rows[0].user_id,
        email: findUser.rows[0].email,
        username: String(findUser.rows[0].username),
        avatar_text: String(findUser.rows[0].avatar_text),
        avatar_color: String(findUser.rows[0].avatar_color),
        avatar_rotation: findUser.rows[0].avatar_rotation,
      };
      next();
    }
  );
}
