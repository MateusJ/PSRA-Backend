import { Prisma, PrismaClient, TipoSaude } from "@prisma/client";

const saudes: Prisma.SaudeUncheckedCreateInput[] = [
  {
    id: "55555555-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    tipo: TipoSaude.VACINA,
    descricao: "Vacina contra febre aftosa",
    data_aplicacao: new Date("2025-01-12T00:00:00Z"),
    veterinario_responsavel: "Dra. Ana Souza - CRMV 12345",
    id_animal: "a5a5a5a5-5555-5555-5555-555555555555",
  },
  {
    id: "66666666-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    tipo: TipoSaude.MEDICAMENTO,
    descricao: "Vermifugo",
    data_aplicacao: new Date("2025-02-05T00:00:00Z"),
    veterinario_responsavel: "Dr. Paulo Lima - CRMV 67890",
    id_animal: "a5a5a5a5-5555-5555-5555-555555555555",
  },
  {
    id: "77777777-cccc-cccc-cccc-cccccccccccc",
    tipo: TipoSaude.EXAME,
    descricao: "Exame de brucelose",
    data_aplicacao: new Date("2025-03-02T00:00:00Z"),
    veterinario_responsavel: "Dra. Ana Souza - CRMV 12345",
    id_animal: "a5a5a5a5-5555-5555-5555-555555555555",
  },
  {
    id: "88888888-dddd-dddd-dddd-dddddddddddd",
    tipo: TipoSaude.VACINA,
    descricao: "Vacina clostridial",
    data_aplicacao: new Date("2025-01-18T00:00:00Z"),
    veterinario_responsavel: "Dr. Roberto Silva - CRMV 24680",
    id_animal: "a6a6a6a6-6666-6666-6666-666666666666",
  },
  {
    id: "99999999-eeee-eeee-eeee-eeeeeeeeeeee",
    tipo: TipoSaude.MEDICAMENTO,
    descricao: "Suplemento mineral",
    data_aplicacao: new Date("2025-02-18T00:00:00Z"),
    veterinario_responsavel: "Dra. Carla Mendes - CRMV 13579",
    id_animal: "a6a6a6a6-6666-6666-6666-666666666666",
  },
  {
    id: "aaaaaaaa-ffff-ffff-ffff-ffffffffffff",
    tipo: TipoSaude.EXAME,
    descricao: "Exame de leucemia",
    data_aplicacao: new Date("2025-03-10T00:00:00Z"),
    veterinario_responsavel: "Dr. Roberto Silva - CRMV 24680",
    id_animal: "a6a6a6a6-6666-6666-6666-666666666666",
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
