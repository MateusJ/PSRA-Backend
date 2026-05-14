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

export async function getMovimentacaoById(id: string) {
  const movimentacao = await prisma.movimentacao.findUnique({ where: { id } });
  if (!movimentacao) {
    throw new ServiceError("Movimentacao not found", 404);
  }

  return movimentacao;
}

export async function getMovimentacoes() {
  return prisma.movimentacao.findMany();
}

export async function updateMovimentacao(id: string, payload: unknown) {
  const parsed = updateMovimentacaoSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }
  if (Object.keys(parsed.data).length === 0) {
    throw new ServiceError("No data to update", 400);
  }

  const movimentacao = await prisma.movimentacao.findUnique({ where: { id } });
  if (!movimentacao) {
    throw new ServiceError("Movimentacao not found", 404);
  }

  return prisma.movimentacao.update({
    where: { id },
    data: parsed.data,
  });
}

export async function deleteMovimentacao(id: string) {
  const movimentacao = await prisma.movimentacao.findUnique({ where: { id } });
  if (!movimentacao) {
    throw new ServiceError("Movimentacao not found", 404);
  }

  return prisma.movimentacao.delete({ where: { id } });
}
