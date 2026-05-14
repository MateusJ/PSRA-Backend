import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "dev_secret_change_me";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    (req as Request & { userId?: string }).userId = payload.sub as string;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
