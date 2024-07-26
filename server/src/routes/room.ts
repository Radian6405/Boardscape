import { Router, Request, Response } from "express";
import pool from "../db";
const router: Router = Router();

function generateString(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

router.get("/create-room", async (req: Request, res: Response) => {
  let code = generateString(6);

  if (req.query.type === "tictactoe") {
    while (true) {
      const findRoom = await pool.query(
        "SELECT * FROM tictactoe_room_data WHERE room_code = $1",
        [code]
      );
      if (findRoom.rowCount === 0) break;
      code = generateString(6);
    }

    const newRoom = await pool.query(
      "INSERT INTO tictactoe_room_data(room_code, is_game_started) VALUES($1,$2) RETURNING *",
      [code, false]
    );
  }

  res.status(200).send({ code: code });
});

export default router;
