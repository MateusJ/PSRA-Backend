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
