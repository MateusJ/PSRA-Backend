import { PrismaClient } from "@prisma/client";

const animais = [
  {
    id: "a1a1a1a1-1111-1111-1111-111111111111",
    tag_rfid: "0XE28069150000401B96658290",
    raca: "Nelore",
    pelagem: "Branca",
    peso_nascimento_kg: 33.2,
    altura_nascimento_cm: 78.0,
    data_nascimento: new Date("2022-01-10T00:00:00Z"),
    data_insercao_rfid: new Date("2022-01-10T00:00:00Z"),
    data_abate: null,
    id_propriedade: "cccccccc-cccc-cccc-cccc-cccccccccccc",
  },
  {
    id: "a2a2a2a2-2222-2222-2222-222222222222",
    tag_rfid: "0XE28069150000401D63E21D8E",
    raca: "Angus",
    pelagem: "Preta",
    peso_nascimento_kg: 31.0,
    altura_nascimento_cm: 76.0,
    data_nascimento: new Date("2022-03-05T00:00:00Z"),
    data_insercao_rfid: new Date("2022-03-05T00:00:00Z"),
    data_abate: null,
    id_propriedade: "cccccccc-cccc-cccc-cccc-cccccccccccc",
  },
  {
    id: "a3a3a3a3-3333-3333-3333-333333333333",
    tag_rfid: "0XAAA1000037753291000003C3",
    raca: "Girolando",
    pelagem: "Malhada",
    peso_nascimento_kg: 34.0,
    altura_nascimento_cm: 79.0,
    data_nascimento: new Date("2021-11-20T00:00:00Z"),
    data_insercao_rfid: new Date("2021-11-20T00:00:00Z"),
    data_abate: null,
    id_propriedade: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
  },
  {
    id: "a4a4a4a4-4444-4444-4444-444444444444",
    tag_rfid: "0XD01600000000000000000000",
    raca: "Nelore",
    pelagem: "Marrom",
    peso_nascimento_kg: 32.0,
    altura_nascimento_cm: 77.0,
    data_nascimento: new Date("2021-09-12T00:00:00Z"),
    data_insercao_rfid: new Date("2021-09-12T00:00:00Z"),
    data_abate: null,
    id_propriedade: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
  },
  {
    id: "a5a5a5a5-5555-5555-5555-555555555555",
    tag_rfid: "0XE28011704000021CB916AAD4",
    raca: "Angus",
    pelagem: "Preta",
    peso_nascimento_kg: 29.5,
    altura_nascimento_cm: 74.0,
    data_nascimento: new Date("2023-01-22T00:00:00Z"),
    data_insercao_rfid: new Date("2023-01-22T00:00:00Z"),
    data_abate: null,
    id_propriedade: "cccccccc-cccc-cccc-cccc-cccccccccccc",
  },
  {
    id: "a6a6a6a6-6666-6666-6666-666666666666",
    tag_rfid: "0X000060000000000000000000",
    raca: "Girolando",
    pelagem: "Branca",
    peso_nascimento_kg: 28.7,
    altura_nascimento_cm: 73.0,
    data_nascimento: new Date("2023-04-18T00:00:00Z"),
    data_insercao_rfid: new Date("2023-04-18T00:00:00Z"),
    data_abate: null,
    id_propriedade: "cccccccc-cccc-cccc-cccc-cccccccccccc",
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
