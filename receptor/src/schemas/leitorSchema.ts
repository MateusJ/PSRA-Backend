import { z } from "zod";

export const createLeitorSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1),
  id_propriedade: z.string().min(1),
});

export const updateLeitorSchema = z.object({
  nome: z.string().min(1).optional(),
  id_propriedade: z.string().min(1).optional(),
});
