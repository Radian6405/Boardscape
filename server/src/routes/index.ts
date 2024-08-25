import { Router } from "express";
import authRouter from "./auth";
import googleOAuthRouter from "./OAuth/google";
import roomRouter from "./room";

const router: Router = Router();

router.use(authRouter);
router.use(googleOAuthRouter);
router.use(roomRouter);

export default router;
