import { PrismaClient } from "@prisma/client";

const animais = [
  {
    id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    tag_rfid: "E2000017221101441890ABCD",
    raca: "Nelore",
    data_nascimento: new Date("2022-08-15T00:00:00Z"),
    id_propriedade: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  },
  {
    id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
    tag_rfid: "E2000017221101441890DCBA",
    raca: "Angus",
    data_nascimento: new Date("2023-02-10T00:00:00Z"),
    id_propriedade: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
  },
];

export async function seedAnimal(prisma: PrismaClient) {
  for (const animal of animais) {
    const { id, ...data } = animal;
    await prisma.animal.upsert({
      where: { id },
      update: data,
      create: animal,
    });
  }
}
