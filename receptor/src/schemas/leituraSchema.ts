import { z } from "zod";

export const createLeituraSchema = z.object({
  rssi: z.number().optional(),
  timestamp: z.coerce.date().optional(),
  id_animal: z.string().min(1),
  id_leitor: z.string().min(1),
});

export const updateLeituraSchema = z.object({
  rssi: z.number().optional(),
  timestamp: z.coerce.date().optional(),
  id_animal: z.string().min(1).optional(),
  id_leitor: z.string().min(1).optional(),
});
