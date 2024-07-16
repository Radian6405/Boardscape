import { Router } from "express";
import authRouter from "./auth";
import googleOAuthRouter from "./OAuth/google";

const router: Router = Router();

router.use(authRouter);
router.use(googleOAuthRouter);

export default router;
