import { prisma } from "../lib/prisma";
import { createAnimalSchema, updateAnimalSchema } from "../schemas/animalSchema";
import { ServiceError } from "./serviceError";

export async function createAnimal(payload: unknown) {
  const parsed = createAnimalSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }

  return prisma.animal.create({ data: parsed.data });
}

export async function getAnimalById(id: string) {
  const animal = await prisma.animal.findUnique({ where: { id } });
  if (!animal) {
    throw new ServiceError("Animal not found", 404);
  }

  return animal;
}

export async function getAnimais() {
  return prisma.animal.findMany();
}

export async function updateAnimal(id: string, payload: unknown) {
  const parsed = updateAnimalSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError("Validation failed", 400, parsed.error.flatten());
  }
  if (Object.keys(parsed.data).length === 0) {
    throw new ServiceError("No data to update", 400);
  }

  const animal = await prisma.animal.findUnique({ where: { id } });
  if (!animal) {
    throw new ServiceError("Animal not found", 404);
  }

  return prisma.animal.update({ where: { id }, data: parsed.data });
}

export async function deleteAnimal(id: string) {
  const animal = await prisma.animal.findUnique({ where: { id } });
  if (!animal) {
    throw new ServiceError("Animal not found", 404);
  }

  return prisma.animal.delete({ where: { id } });
}
