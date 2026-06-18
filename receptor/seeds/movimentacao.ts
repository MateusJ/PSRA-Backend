import { PrismaClient } from "@prisma/client";

const movimentacoes = [
  {
    id: "11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    data: new Date("2025-01-10T08:00:00Z"),
    id_animal: "a1a1a1a1-1111-1111-1111-111111111111",
    id_origem: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    id_destino: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    motivo: "Transferencia entre propriedades",
    responsavel_nome: "Carlos Mendes",
    responsavel_cpf: "123.456.789-00",
    pendente_dados: false,
  },
  {
    id: "22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    data: new Date("2025-02-15T09:30:00Z"),
    id_animal: "a1a1a1a1-1111-1111-1111-111111111111",
    id_origem: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    id_destino: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    motivo: "Transferencia entre propriedades",
    responsavel_nome: "Carlos Mendes",
    responsavel_cpf: "123.456.789-00",
    pendente_dados: false,
  },
  {
    id: "33333333-cccc-cccc-cccc-cccccccccccc",
    data: new Date("2025-01-20T10:15:00Z"),
    id_animal: "a2a2a2a2-2222-2222-2222-222222222222",
    id_origem: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    id_destino: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    motivo: "Transferencia entre propriedades",
    responsavel_nome: "Marina Oliveira",
    responsavel_cpf: "987.654.321-00",
    pendente_dados: false,
  },
  {
    id: "44444444-dddd-dddd-dddd-dddddddddddd",
    data: new Date("2025-03-05T11:45:00Z"),
    id_animal: "a2a2a2a2-2222-2222-2222-222222222222",
    id_origem: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    id_destino: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    motivo: "Transferencia entre propriedades",
    responsavel_nome: "Marina Oliveira",
    responsavel_cpf: "987.654.321-00",
    pendente_dados: false,
  },
];

export async function seedMovimentacao(prisma: PrismaClient) {
  for (const movimentacao of movimentacoes) {
    const { id, ...data } = movimentacao;
    await prisma.movimentacao.upsert({
      where: { id },
      update: data,
      create: movimentacao,
    });
  }
}
