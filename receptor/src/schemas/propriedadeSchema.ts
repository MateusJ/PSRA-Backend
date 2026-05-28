import { z } from "zod";

export const createPropriedadeSchema = z.object({
  nome: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  cnpj_cpf_responsavel: z.string().min(1),
  registro_estadual: z.string().min(1),
});

export const updatePropriedadeSchema = z.object({
  nome: z.string().min(1).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  cnpj_cpf_responsavel: z.string().min(1).optional(),
  registro_estadual: z.string().min(1).optional(),
});
