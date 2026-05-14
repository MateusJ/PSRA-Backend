import { PrismaClient } from "@prisma/client";

const leituras = [
  {
    id: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
    rssi: -45.5,
    timestamp: new Date("2025-05-10T12:30:00Z"),
    id_animal: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    id_leitor: "AA:BB:CC:DD:EE:01",
  },
  {
    id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
    rssi: -47.2,
    timestamp: new Date("2025-05-10T13:05:00Z"),
    id_animal: "dddddddd-dddd-dddd-dddd-dddddddddddd",
    id_leitor: "AA:BB:CC:DD:EE:02",
  },
];

export async function seedLeitura(prisma: PrismaClient) {
  for (const leitura of leituras) {
    const { id, ...data } = leitura;
    await prisma.leitura.upsert({
      where: { id },
      update: data,
      create: leitura,
    });
  }
}
