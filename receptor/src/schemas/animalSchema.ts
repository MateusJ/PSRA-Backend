import { z } from "zod";

export const createAnimalSchema = z.object({
  tag_rfid: z.string().min(1),
  raca: z.string().min(1),
  data_nascimento: z.coerce.date(),
  id_propriedade: z.string().min(1),
});

export const updateAnimalSchema = z.object({
  tag_rfid: z.string().min(1).optional(),
  raca: z.string().min(1).optional(),
  data_nascimento: z.coerce.date().optional(),
  id_propriedade: z.string().min(1).optional(),
});
