import { Router, Request, Response } from "express";
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

  res.status(200).send({ code: code });
});

export default router;
