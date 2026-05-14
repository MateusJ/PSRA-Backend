import { PrismaClient } from "@prisma/client";

const leitores = [
  {
    id: "AA:BB:CC:DD:EE:01",
    nome: "Portao Sul",
    id_propriedade: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  },
  {
    id: "AA:BB:CC:DD:EE:02",
    nome: "Curral Vacinacao",
    id_propriedade: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
  },
];

export async function seedLeitor(prisma: PrismaClient) {
  for (const leitor of leitores) {
    const { id, ...data } = leitor;
    await prisma.leitor.upsert({
      where: { id },
      update: data,
      create: leitor,
    });
  }
}
