import { Pagination } from "../lib/pagination";
import { prisma } from "../lib/prisma";
import {
  createPropriedadeSchema,
  updatePropriedadeSchema,
} from "../schemas/propriedadeSchema";
import { ServiceError } from "./serviceError";

export async function createPropriedade(
  userId: string | undefined,
  payload: unknown,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const parsed = createPropriedadeSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }

  return prisma.propriedade.create({
    data: {
      ...parsed.data,
      id_usuario: userId,
    },
  });
}

export async function validateIfExistAndReturn(id: string) {
  const propriedade = await prisma.propriedade.findUnique({ where: { id } });
  if (!propriedade) {
    throw new ServiceError("Propriedade not found", 404);
  }

  return propriedade;
}

export async function getPropriedadeById(
  userId: string | undefined,
  id: string,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const propriedade = await prisma.propriedade.findFirst({
    where: { id, id_usuario: userId },
  });
  if (!propriedade) {
    throw new ServiceError("Propriedade not found", 404);
  }

  return propriedade;
}

export async function getPropriedades(
  userId: string | undefined,
  pagination: Pagination,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const where = { id_usuario: userId };
  const [total, data] = await prisma.$transaction([
    prisma.propriedade.count({ where }),
    prisma.propriedade.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
    }),
  ]);

  return { data, total };
}

export async function updatePropriedade(
  userId: string | undefined,
  id: string,
  payload: unknown,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const parsed = updatePropriedadeSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }
  if (Object.keys(parsed.data).length === 0) {
    throw new ServiceError("No data to update", 400);
  }

  const propriedade = await prisma.propriedade.findFirst({
    where: { id, id_usuario: userId },
  });
  if (!propriedade) {
    throw new ServiceError("Propriedade not found", 404);
  }

  return prisma.propriedade.update({ where: { id }, data: parsed.data });
}

export async function deletePropriedade(
  userId: string | undefined,
  id: string,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const propriedade = await prisma.propriedade.findFirst({
    where: { id, id_usuario: userId },
  });
  if (!propriedade) {
    throw new ServiceError("Propriedade not found", 404);
  }

  return prisma.propriedade.delete({ where: { id } });
}
