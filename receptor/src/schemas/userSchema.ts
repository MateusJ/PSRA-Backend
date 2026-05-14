import { z } from "zod";

export const createUsuarioSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  senha: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(1),
});
