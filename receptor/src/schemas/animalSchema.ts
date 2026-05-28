import { z } from "zod";

export const createAnimalSchema = z.object({
  tag_rfid: z.string().min(1),
  raca: z.string().min(1),
  pelagem: z.string().min(1),
  peso_nascimento_kg: z.number().optional(),
  altura_nascimento_cm: z.number().optional(),
  data_nascimento: z.coerce.date(),
  data_insercao_rfid: z.coerce.date(),
  data_abate: z.coerce.date().optional(),
  id_propriedade: z.string().min(1),
});

export const updateAnimalSchema = z.object({
  tag_rfid: z.string().min(1).optional(),
  raca: z.string().min(1).optional(),
  pelagem: z.string().min(1).optional(),
  peso_nascimento_kg: z.number().optional(),
  altura_nascimento_cm: z.number().optional(),
  data_nascimento: z.coerce.date().optional(),
  data_insercao_rfid: z.coerce.date().optional(),
  data_abate: z.coerce.date().optional(),
  id_propriedade: z.string().min(1).optional(),
});
