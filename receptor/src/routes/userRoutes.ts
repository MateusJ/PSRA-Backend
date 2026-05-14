import { Router } from "express";
import { createUsuario, login, me } from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/", createUsuario);
userRouter.post("/login", login);
userRouter.get("/me", authMiddleware, me);

export { userRouter };
