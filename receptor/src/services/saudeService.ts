import { Pagination } from "../lib/pagination";
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

export async function validateIfExistAndReturn(id: string) {
  const saude = await prisma.saude.findUnique({ where: { id } });
  if (!saude) {
    throw new ServiceError("Saude not found", 404);
  }

  return saude;
}

export async function getSaudeById(userId: string | undefined, id: string) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const saude = await prisma.saude.findFirst({
    where: { id, animal: { propriedade: { id_usuario: userId } } },
  });
  if (!saude) {
    throw new ServiceError("Saude not found", 404);
  }

  return saude;
}

export async function getSaudes(
  userId: string | undefined,
  pagination: Pagination,
) {
  if (!userId) {
    throw new ServiceError("Unauthorized", 401);
  }

  const where = { animal: { propriedade: { id_usuario: userId } } };
  const [total, data] = await prisma.$transaction([
    prisma.saude.count({ where }),
    prisma.saude.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
    }),
  ]);

  return { data, total };
}

export async function updateSaude(id: string, payload: unknown) {
  const parsed = updateSaudeSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }
  if (Object.keys(parsed.data).length === 0) {
    throw new ServiceError("No data to update", 400);
  }

  await validateIfExistAndReturn(id);

  return prisma.saude.update({ where: { id }, data: parsed.data });
}

export async function deleteSaude(id: string) {
  await validateIfExistAndReturn(id);

  return prisma.saude.delete({ where: { id } });
}
