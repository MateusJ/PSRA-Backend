import { prisma } from "../lib/prisma";
import {
  createLeituraSchema,
  updateLeituraSchema,
} from "../schemas/leituraSchema";
import { ServiceError } from "./serviceError";

export async function createLeitura(payload: unknown) {
  const parsed = createLeituraSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }

  return prisma.leitura.create({ data: parsed.data });
}

export async function validateIfExistAndReturn(id: string) {
  const leitura = await prisma.leitura.findUnique({ where: { id } });
  if (!leitura) {
    throw new ServiceError("Leitura not found", 404);
  }

  return leitura;
}

export async function getLeituraById(id: string) {
  return validateIfExistAndReturn(id);
}

export async function getLeituras() {
  return prisma.leitura.findMany();
}

export async function updateLeitura(id: string, payload: unknown) {
  const parsed = updateLeituraSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }
  if (Object.keys(parsed.data).length === 0) {
    throw new ServiceError("No data to update", 400);
  }

  await validateIfExistAndReturn(id);

  return prisma.leitura.update({ where: { id }, data: parsed.data });
}

export async function deleteLeitura(id: string) {
  await validateIfExistAndReturn(id);

  return prisma.leitura.delete({ where: { id } });
}
