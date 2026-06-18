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

function parseJanelaEmMinutos(janela: string | undefined): number {
  if (!janela) {
    return 24 * 60;
  }

  const match = janela.match(/^(\d+)(m|h|d)$/i);
  if (!match) {
    return 24 * 60;
  }

  const value = Number(match[1]);
  if (!Number.isFinite(value) || value <= 0) {
    return 24 * 60;
  }

  const unit = match[2].toLowerCase();
  if (unit === "m") {
    return value;
  }
  if (unit === "h") {
    return value * 60;
  }
  return value * 60 * 24;
}

function parseIntervaloMinutos(intervalo: string | undefined): number {
  const parsed = Number(intervalo);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 60;
  }

  return Math.min(Math.floor(parsed), 1440);
}

export async function getLeituraSerie(
  userId: string | undefined,
  janela: string | undefined,
  intervalo: string | undefined,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const janelaMinutos = parseJanelaEmMinutos(janela);
  const intervaloMinutos = parseIntervaloMinutos(intervalo);

  const end = new Date();
  const start = new Date(end.getTime() - janelaMinutos * 60 * 1000);
  const bucketMs = intervaloMinutos * 60 * 1000;
  const totalBuckets = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / bucketMs),
  );

  const counts = Array.from({ length: totalBuckets }, () => 0);

  const leituras = await prisma.leitura.findMany({
    where: {
      timestamp: { gte: start, lte: end },
      animal: { propriedade: { id_usuario: userId } },
    },
    select: { timestamp: true },
  });

  for (const leitura of leituras) {
    const index = Math.floor(
      (leitura.timestamp.getTime() - start.getTime()) / bucketMs,
    );
    if (index >= 0 && index < counts.length) {
      counts[index] += 1;
    }
  }

  const pontos = counts.map((total, index) => ({
    timestamp: new Date(start.getTime() + index * bucketMs).toISOString(),
    total,
  }));

  return { intervalo_minutos: intervaloMinutos, pontos };
}

export async function getLeiturasRecentes(
  userId: string | undefined,
  limit: string | undefined,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const parsedLimit = Number(limit);
  const take = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(Math.floor(parsedLimit), 1), 50)
    : 5;

  const data = await prisma.leitura.findMany({
    where: { animal: { propriedade: { id_usuario: userId } } },
    orderBy: { timestamp: "desc" },
    take,
    include: {
      animal: { select: { id: true, tag_rfid: true } },
      leitor: { select: { id: true, nome: true } },
    },
  });

  return {
    data: data.map((leitura) => ({
      id: leitura.id,
      id_animal: leitura.animal.id,
      tag_rfid: leitura.animal.tag_rfid,
      leitor_nome: leitura.leitor.nome,
      leitor_id: leitura.leitor.id,
      timestamp: leitura.timestamp,
    })),
  };
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
