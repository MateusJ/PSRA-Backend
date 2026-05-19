import { Pagination } from "../lib/pagination";
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

export async function validateIfExistAndReturn(id: string) {
  const leitor = await prisma.leitor.findUnique({ where: { id } });
  if (!leitor) {
    throw new ServiceError("Leitor not found", 404);
  }

  return leitor;
}

export async function getLeitorById(userId: string | undefined, id: string) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const leitor = await prisma.leitor.findFirst({
    where: { id, propriedade: { id_usuario: userId } },
  });
  if (!leitor) {
    throw new ServiceError("Leitor not found", 404);
  }

  return leitor;
}

export async function getLeitores(
  userId: string | undefined,
  pagination: Pagination,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const where = { propriedade: { id_usuario: userId } };
  const [total, data] = await prisma.$transaction([
    prisma.leitor.count({ where }),
    prisma.leitor.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
    }),
  ]);

  return { data, total };
}

export async function updateLeitor(id: string, payload: unknown) {
  const parsed = updateLeitorSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }
  if (Object.keys(parsed.data).length === 0) {
    throw new ServiceError("No data to update", 400);
  }

  await validateIfExistAndReturn(id);

  return prisma.leitor.update({ where: { id }, data: parsed.data });
}

export async function deleteLeitor(id: string) {
  const leitor = await prisma.leitor.findUnique({ where: { id } });
  if (!leitor) {
    throw new ServiceError("Leitor not found", 404);
  }

  return prisma.leitor.delete({ where: { id } });
}
