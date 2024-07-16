import { Router, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();
const router: Router = Router();

router.get("/google-oauth/url", async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectURL: string = "http://127.0.0.1:5173/redirect";

  const OAuthHandler = new OAuth2Client(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectURL
  );

  const authoriseURL = OAuthHandler.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });

  res.json({ url: authoriseURL });
});

router.get("/google-oauth/login", async (req: Request, res: Response) => {
  const code: string = String(req.query.code);
  try {
    const redirectURL: string = "http://127.0.0.1:5173/redirect";

    const OAuthHandler = new OAuth2Client(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      redirectURL
    );

    const response = await OAuthHandler.getToken(code);
    res.status(200).send(response.tokens);
  } catch (error) {
    console.log("test: ", error);
  }
});

router.get(
  "/google-oauth/access-token",
  async (req: Request, res: Response) => {
    const refresh_token: string = String(req.query.refresh_token);
    const response = await fetch("https://www.googleapis.com/oauth2/v4/token", {
      method: "POST",
      body: JSON.stringify({
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        refresh_token: refresh_token,
        grant_type: "refresh_token",
      }),
    });
    const data = await response.json();
    res.status(200).send(data);
  }
);

router.get("/google-oauth/status", async (req: Request, res: Response) => {
  const access_token: string = String(req.query.access_token);
  try {
    const user_data = await getUserData(access_token);

    res.status(200).send(user_data);
  } catch (error) {
    console.log(error);
  }
});

async function getUserData(access_token: string) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  return data;
}

export default router;
