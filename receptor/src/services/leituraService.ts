import { Pagination } from "../lib/pagination";
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

export async function getLeituraById(userId: string | undefined, id: string) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const leitura = await prisma.leitura.findFirst({
    where: { id, animal: { propriedade: { id_usuario: userId } } },
  });
  if (!leitura) {
    throw new ServiceError("Leitura not found", 404);
  }

  return leitura;
}

export async function getLeituras(
  userId: string | undefined,
  pagination: Pagination,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const where = { animal: { propriedade: { id_usuario: userId } } };
  const [total, data] = await prisma.$transaction([
    prisma.leitura.count({ where }),
    prisma.leitura.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
    }),
  ]);

  return { data, total };
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
