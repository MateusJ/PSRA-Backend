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

  const { motivo, responsavel_nome, responsavel_cpf, pendente_dados, ...rest } =
    parsed.data;
  const hasAllDetails = Boolean(motivo && responsavel_nome && responsavel_cpf);
  const isPendente = pendente_dados === true || !hasAllDetails;

  if (!hasAllDetails && pendente_dados !== true) {
    throw new ServiceError(
      "Movimentacao requires motivo, responsavel_nome e responsavel_cpf",
      400,
    );
  }

  return prisma.movimentacao.create({
    data: {
      ...rest,
      motivo: motivo ?? null,
      responsavel_nome: responsavel_nome ?? null,
      responsavel_cpf: responsavel_cpf ?? null,
      pendente_dados: isPendente,
    },
  });
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

  const shouldRecalcPendente =
    "motivo" in parsed.data ||
    "responsavel_nome" in parsed.data ||
    "responsavel_cpf" in parsed.data;

  if (!shouldRecalcPendente) {
    await validateIfExistAndReturn(id);
    return prisma.movimentacao.update({
      where: { id },
      data: parsed.data,
    });
  }

  const current = await validateIfExistAndReturn(id);
  const motivoFinal = parsed.data.motivo ?? current.motivo ?? undefined;
  const responsavelNomeFinal =
    parsed.data.responsavel_nome ?? current.responsavel_nome ?? undefined;
  const responsavelCpfFinal =
    parsed.data.responsavel_cpf ?? current.responsavel_cpf ?? undefined;
  const hasAllDetails = Boolean(
    motivoFinal && responsavelNomeFinal && responsavelCpfFinal,
  );

  return prisma.movimentacao.update({
    where: { id },
    data: {
      ...parsed.data,
      pendente_dados: !hasAllDetails,
    },
  });
}

export async function deleteMovimentacao(id: string) {
  await validateIfExistAndReturn(id);

  return prisma.movimentacao.delete({ where: { id } });
}
