import { prisma } from "../lib/prisma";
import {
  createLeitorSchema,
  updateLeitorSchema,
} from "../schemas/leitorSchema";
import { ServiceError } from "./serviceError";

export async function createLeitor(payload: unknown) {
  const parsed = createLeitorSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }

  return prisma.leitor.create({ data: parsed.data });
}

export async function getLeitorById(id: string) {
  const leitor = await prisma.leitor.findUnique({ where: { id } });
  if (!leitor) {
    throw new ServiceError("Leitor not found", 404);
  }

  return leitor;
}

export async function getLeitores() {
  return prisma.leitor.findMany();
}

export async function updateLeitor(id: string, payload: unknown) {
  const parsed = updateLeitorSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }
  if (Object.keys(parsed.data).length === 0) {
    throw new ServiceError("No data to update", 400);
  }

  const leitor = await prisma.leitor.findUnique({ where: { id } });
  if (!leitor) {
    throw new ServiceError("Leitor not found", 404);
  }

  return prisma.leitor.update({ where: { id }, data: parsed.data });
}

export async function deleteLeitor(id: string) {
  const leitor = await prisma.leitor.findUnique({ where: { id } });
  if (!leitor) {
    throw new ServiceError("Leitor not found", 404);
  }

  return prisma.leitor.delete({ where: { id } });
}
