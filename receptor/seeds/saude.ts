import { Prisma, PrismaClient, TipoSaude } from "@prisma/client";

const saudes: Prisma.SaudeUncheckedCreateInput[] = [
  {
    id: "99999999-9999-9999-9999-999999999999",
    tipo: TipoSaude.VACINA,
    descricao: "Vacina contra febre aftosa",
    data_aplicacao: new Date("2025-01-20T00:00:00Z"),
    veterinario_responsavel: "Dra. Ana Souza - CRMV 12345",
    id_animal: "cccccccc-cccc-cccc-cccc-cccccccccccc",
  },
  {
    id: "88888888-8888-8888-8888-888888888888",
    tipo: TipoSaude.EXAME,
    descricao: "Exame de brucelose",
    data_aplicacao: new Date("2025-02-12T00:00:00Z"),
    veterinario_responsavel: "Dr. Paulo Lima - CRMV 67890",
    id_animal: "dddddddd-dddd-dddd-dddd-dddddddddddd",
  },
];

export async function seedSaude(prisma: PrismaClient) {
  for (const saude of saudes) {
    const { id, ...data } = saude;
    await prisma.saude.upsert({
      where: { id },
      update: data,
      create: saude,
    });
  }
}
