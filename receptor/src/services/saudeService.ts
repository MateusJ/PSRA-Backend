import { prisma } from "../lib/prisma";
import { createSaudeSchema, updateSaudeSchema } from "../schemas/saudeSchema";
import { ServiceError } from "./serviceError";

export async function createSaude(payload: unknown) {
  const parsed = createSaudeSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }

  return prisma.saude.create({ data: parsed.data });
}

export async function getSaudeById(id: string) {
  const saude = await prisma.saude.findUnique({ where: { id } });
  if (!saude) {
    throw new ServiceError("Saude not found", 404);
  }

  return saude;
}

export async function getSaudes() {
  return prisma.saude.findMany();
}

export async function updateSaude(id: string, payload: unknown) {
  const parsed = updateSaudeSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }
  if (Object.keys(parsed.data).length === 0) {
    throw new ServiceError("No data to update", 400);
  }

  const saude = await prisma.saude.findUnique({ where: { id } });
  if (!saude) {
    throw new ServiceError("Saude not found", 404);
  }

  return prisma.saude.update({ where: { id }, data: parsed.data });
}

export async function deleteSaude(id: string) {
  const saude = await prisma.saude.findUnique({ where: { id } });
  if (!saude) {
    throw new ServiceError("Saude not found", 404);
  }

  return prisma.saude.delete({ where: { id } });
}
