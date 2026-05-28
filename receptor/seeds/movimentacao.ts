import { PrismaClient } from "@prisma/client";

const movimentacoes = [
  {
    id: "77777777-7777-7777-7777-777777777777",
    data: new Date("2025-03-01T08:00:00Z"),
    id_animal: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    id_origem: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    id_destino: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    motivo: "Transferencia entre propriedades",
    responsavel_nome: "Carlos Mendes",
    responsavel_cpf: "123.456.789-00",
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
