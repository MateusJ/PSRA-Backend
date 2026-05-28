import { PrismaClient } from "@prisma/client";

const animais = [
  {
    id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    tag_rfid: "E2000017221101441890ABCD",
    raca: "Nelore",
    pelagem: "Branca",
    peso_nascimento_kg: 32.5,
    altura_nascimento_cm: 78.0,
    data_nascimento: new Date("2022-08-15T00:00:00Z"),
    data_insercao_rfid: new Date("2022-08-15T00:00:00Z"),
    data_abate: null,
    id_propriedade: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  },
  {
    id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
    tag_rfid: "E2000017221101441890DCBA",
    raca: "Angus",
    pelagem: "Preta",
    peso_nascimento_kg: 30.0,
    altura_nascimento_cm: 75.0,
    data_nascimento: new Date("2023-02-10T00:00:00Z"),
    data_insercao_rfid: new Date("2023-02-10T00:00:00Z"),
    data_abate: null,
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
