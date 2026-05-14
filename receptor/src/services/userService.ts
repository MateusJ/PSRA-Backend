import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { createUsuarioSchema, loginSchema } from "../schemas/userSchema";

const jwtSecret = process.env.JWT_SECRET || "dev_secret_change_me";

export class ServiceError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function registerUser(payload: unknown) {
  const parsed = createUsuarioSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }

  const existing = await prisma.usuario.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    throw new ServiceError("Email already registered", 409);
  }

  const user = await prisma.usuario.create({ data: parsed.data });
  return { id: user.id, nome: user.nome, email: user.email };
}

export async function loginUser(payload: unknown) {
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }

  const user = await prisma.usuario.findUnique({
    where: { email: parsed.data.email },
  });
  if (!user || user.senha !== parsed.data.senha) {
    throw new ServiceError("Invalid credentials", 401);
  }

  const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: "1d" });
  return { token };
}

export async function getMe(userId?: string) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const user = await prisma.usuario.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ServiceError("User not found", 404);
  }

  return { id: user.id, nome: user.nome, email: user.email };
}
