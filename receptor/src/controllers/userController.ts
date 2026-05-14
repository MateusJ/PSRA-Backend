import { Request, Response } from "express";
import {
  getMe,
  loginUser,
  registerUser,
  ServiceError,
} from "../services/userService";

export async function createUsuario(req: Request, res: Response) {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(error.status).json({
        message: error.message,
        errors: error.details,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const result = await loginUser(req.body);
    return res.json(result);
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(error.status).json({
        message: error.message,
        errors: error.details,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function me(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;
    const user = await getMe(userId);
    return res.json(user);
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(error.status).json({
        message: error.message,
        errors: error.details,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
