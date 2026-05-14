import { z } from "zod";

export const createSaudeSchema = z.object({
  tipo: z.enum(["VACINA", "MEDICAMENTO", "EXAME", "CIRURGIA"]),
  descricao: z.string().min(1).optional(),
  data_aplicacao: z.coerce.date().optional(),
  id_animal: z.string().min(1),
});

export const updateSaudeSchema = z.object({
  tipo: z.enum(["VACINA", "MEDICAMENTO", "EXAME", "CIRURGIA"]).optional(),
  descricao: z.string().min(1).optional(),
  data_aplicacao: z.coerce.date().optional(),
  id_animal: z.string().min(1).optional(),
});
