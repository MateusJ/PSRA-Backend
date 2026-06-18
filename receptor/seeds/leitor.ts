import { PrismaClient } from "@prisma/client";

const leitores = [
  {
    id: "a043a11f8a3c",
    nome: "Leitor Portao Principal",
    id_propriedade: "cccccccc-cccc-cccc-cccc-cccccccccccc",
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
