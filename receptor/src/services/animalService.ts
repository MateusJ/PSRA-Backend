import { Pagination } from "../lib/pagination";
import { prisma } from "../lib/prisma";
import {
  createAnimalSchema,
  updateAnimalSchema,
} from "../schemas/animalSchema";
import { ServiceError } from "./serviceError";

export async function createAnimal(payload: unknown) {
  const parsed = createAnimalSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }

  return prisma.animal.create({ data: parsed.data });
}

export async function validateIfExistAndReturn(id: string) {
  const animal = await prisma.animal.findUnique({ where: { id } });
  if (!animal) {
    throw new ServiceError("Animal not found", 404);
  }

  return animal;
}

export async function getAnimalByTagRfid(tagRfid: string) {
  const animal = await prisma.animal.findUnique({
    where: { tag_rfid: tagRfid },
  });
  if (!animal) {
    throw new ServiceError("Animal not found", 404);
  }

  return animal;
}

export async function getAnimalById(userId: string | undefined, id: string) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const animal = await prisma.animal.findFirst({
    where: { id, propriedade: { id_usuario: userId } },
  });
  if (!animal) {
    throw new ServiceError("Animal not found", 404);
  }

  return animal;
}

export async function getAnimais(
  userId: string | undefined,
  pagination: Pagination,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const where = { propriedade: { id_usuario: userId } };
  const [total, data] = await prisma.$transaction([
    prisma.animal.count({ where }),
    prisma.animal.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
    }),
  ]);

  return { data, total };
}

export async function getAnimaisAtivosTotal(userId: string | undefined) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  return prisma.animal.count({
    where: {
      data_abate: null,
      propriedade: { id_usuario: userId },
    },
  });
}

export async function getAnimalRastreabilidade(
  userId: string | undefined,
  id: string,
) {
  const animal = await getAnimalById(userId, id);

  const [ultimaLeitura, saudes, movimentacoes] = await Promise.all([
    prisma.leitura.findFirst({
      where: { id_animal: id },
      orderBy: { timestamp: "desc" },
      include: {
        leitor: {
          select: {
            id: true,
            nome: true,
            propriedade: { select: { id: true, nome: true } },
          },
        },
      },
    }),
    prisma.saude.findMany({
      where: { id_animal: id },
      orderBy: { data_aplicacao: "desc" },
    }),
    prisma.movimentacao.findMany({
      where: { id_animal: id },
      include: {
        origem: { select: { id: true, nome: true } },
        destino: { select: { id: true, nome: true } },
      },
      orderBy: { data: "desc" },
    }),
  ]);

  const eventos: Array<Record<string, unknown>> = [];

  if (ultimaLeitura) {
    eventos.push({
      tipo: "localizacao",
      propriedade_id: ultimaLeitura.leitor.propriedade.id,
      propriedade_nome: ultimaLeitura.leitor.propriedade.nome,
      inicio: ultimaLeitura.timestamp,
      fim: null,
      leitor_nome: ultimaLeitura.leitor.nome,
      leitor_id: ultimaLeitura.leitor.id,
    });
  }

  for (const saude of saudes) {
    eventos.push({
      tipo: "saude",
      data: saude.data_aplicacao,
      procedimento: saude.descricao ?? saude.tipo,
      veterinario: saude.veterinario_responsavel,
    });
  }

  for (const movimentacao of movimentacoes) {
    eventos.push({
      tipo: "movimentacao",
      origem_id: movimentacao.origem.id,
      origem_nome: movimentacao.origem.nome,
      destino_id: movimentacao.destino.id,
      destino_nome: movimentacao.destino.nome,
      inicio: movimentacao.data,
      gta: null,
    });
  }

  const eventosOrdenados = eventos.sort((a, b) => {
    const dateA =
      (a.inicio as Date | undefined) || (a.data as Date | undefined) || null;
    const dateB =
      (b.inicio as Date | undefined) || (b.data as Date | undefined) || null;
    const timeA = dateA ? dateA.getTime() : 0;
    const timeB = dateB ? dateB.getTime() : 0;
    return timeB - timeA;
  });

  return {
    animal: { id: animal.id, tag_rfid: animal.tag_rfid },
    eventos: eventosOrdenados,
  };
}

export async function getAnimalRota(userId: string | undefined, id: string) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const animal = await prisma.animal.findFirst({
    where: { id, propriedade: { id_usuario: userId } },
    include: {
      propriedade: {
        include: { usuario: { select: { nome: true } } },
      },
    },
  });
  if (!animal) {
    throw new ServiceError("Animal not found", 404);
  }

  const movimentacoes = await prisma.movimentacao.findMany({
    where: { id_animal: id },
    include: {
      origem: { include: { usuario: { select: { nome: true } } } },
      destino: { include: { usuario: { select: { nome: true } } } },
    },
    orderBy: { data: "asc" },
  });

  const pontos: Array<Record<string, unknown>> = [];
  const linhas: Array<Record<string, unknown>> = [];

  const formatPoint = (
    propriedade: {
      id: string;
      nome: string;
      latitude: number | null;
      longitude: number | null;
      usuario?: { nome: string } | null;
    },
    inicio: Date,
    fim: Date | null,
  ) => ({
    propriedade_id: propriedade.id,
    nome: propriedade.nome,
    lat: propriedade.latitude,
    lng: propriedade.longitude,
    responsavel: propriedade.usuario?.nome ?? null,
    periodo: { inicio, fim },
  });

  if (movimentacoes.length === 0) {
    pontos.push(
      formatPoint(animal.propriedade, animal.data_insercao_rfid, null),
    );

    return { pontos, linhas };
  }

  const firstMov = movimentacoes[0];
  pontos.push(
    formatPoint(firstMov.origem, animal.data_insercao_rfid, firstMov.data),
  );

  movimentacoes.forEach((movimentacao, index) => {
    linhas.push({ de: movimentacao.id_origem, para: movimentacao.id_destino });

    const nextMov = movimentacoes[index + 1] ?? null;
    pontos.push(
      formatPoint(
        movimentacao.destino,
        movimentacao.data,
        nextMov ? nextMov.data : null,
      ),
    );
  });

  return { pontos, linhas };
}

export async function updateAnimal(id: string, payload: unknown) {
  const parsed = updateAnimalSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }
  if (Object.keys(parsed.data).length === 0) {
    throw new ServiceError("No data to update", 400);
  }

  await validateIfExistAndReturn(id);

  return prisma.animal.update({ where: { id }, data: parsed.data });
}

export async function deleteAnimal(id: string) {
  const animal = await prisma.animal.findUnique({ where: { id } });
  if (!animal) {
    throw new ServiceError("Animal not found", 404);
  }

  return prisma.animal.delete({ where: { id } });
}
