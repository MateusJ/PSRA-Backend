import { z } from "zod";

export const createMovimentacaoSchema = z.object({
  data: z.coerce.date().optional(),
  id_animal: z.string().min(1),
  id_origem: z.string().min(1),
  id_destino: z.string().min(1),
});

export const updateMovimentacaoSchema = z.object({
  data: z.coerce.date().optional(),
  id_animal: z.string().min(1).optional(),
  id_origem: z.string().min(1).optional(),
  id_destino: z.string().min(1).optional(),
});
