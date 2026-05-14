import { z } from "zod";

export const createPropriedadeSchema = z.object({
  nome: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const updatePropriedadeSchema = z.object({
  nome: z.string().min(1).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});
