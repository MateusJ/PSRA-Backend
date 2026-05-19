import { Pagination } from "../lib/pagination";
import { prisma } from "../lib/prisma";
import {
  createMovimentacaoSchema,
  updateMovimentacaoSchema,
} from "../schemas/movimentacaoSchema";
import { ServiceError } from "./serviceError";

export async function createMovimentacao(payload: unknown) {
  const parsed = createMovimentacaoSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }

  return prisma.movimentacao.create({ data: parsed.data });
}

export async function validateIfExistAndReturn(id: string) {
  const movimentacao = await prisma.movimentacao.findUnique({ where: { id } });
  if (!movimentacao) {
    throw new ServiceError("Movimentacao not found", 404);
  }

  return movimentacao;
}

export async function getMovimentacaoById(
  userId: string | undefined,
  id: string,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const movimentacao = await prisma.movimentacao.findFirst({
    where: {
      id,
      OR: [
        { origem: { id_usuario: userId } },
        { destino: { id_usuario: userId } },
      ],
    },
  });
  if (!movimentacao) {
    throw new ServiceError("Movimentacao not found", 404);
  }

  return movimentacao;
}

export async function getMovimentacoes(
  userId: string | undefined,
  pagination: Pagination,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const where = {
    OR: [
      { origem: { id_usuario: userId } },
      { destino: { id_usuario: userId } },
    ],
  };
  const [total, data] = await prisma.$transaction([
    prisma.movimentacao.count({ where }),
    prisma.movimentacao.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
    }),
  ]);

  return { data, total };
}

export async function updateMovimentacao(id: string, payload: unknown) {
  const parsed = updateMovimentacaoSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }
  if (Object.keys(parsed.data).length === 0) {
    throw new ServiceError("No data to update", 400);
  }

  await validateIfExistAndReturn(id);

  return prisma.movimentacao.update({
    where: { id },
    data: parsed.data,
  });
}

export async function deleteMovimentacao(id: string) {
  await validateIfExistAndReturn(id);

  return prisma.movimentacao.delete({ where: { id } });
}
