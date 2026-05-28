import { z } from "zod";

export const createMovimentacaoSchema = z.object({
  data: z.coerce.date().optional(),
  id_animal: z.string().min(1),
  id_origem: z.string().min(1),
  id_destino: z.string().min(1),
  motivo: z.string().min(1).optional(),
  responsavel_nome: z.string().min(1).optional(),
  responsavel_cpf: z.string().min(1).optional(),
  pendente_dados: z.boolean().optional(),
});

export const updateMovimentacaoSchema = z.object({
  data: z.coerce.date().optional(),
  id_animal: z.string().min(1).optional(),
  id_origem: z.string().min(1).optional(),
  id_destino: z.string().min(1).optional(),
  motivo: z.string().min(1).optional(),
  responsavel_nome: z.string().min(1).optional(),
  responsavel_cpf: z.string().min(1).optional(),
  pendente_dados: z.boolean().optional(),
});
