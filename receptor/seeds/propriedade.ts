import { PrismaClient } from "@prisma/client";

const propriedades = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    nome: "Fazenda Boa Vista",
    id_usuario: "11111111-1111-1111-1111-111111111111",
    latitude: -23.55052,
    longitude: -46.633308,
    cnpj_cpf_responsavel: "123.456.789-00",
    registro_estadual: "SISBOV-0001",
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    nome: "Sitio Primavera",
    id_usuario: "22222222-2222-2222-2222-222222222222",
    latitude: -22.906847,
    longitude: -43.172897,
    cnpj_cpf_responsavel: "12.345.678/0001-99",
    registro_estadual: "SIGEN-0002",
  },
];

export async function seedPropriedade(prisma: PrismaClient) {
  for (const propriedade of propriedades) {
    const { id, ...data } = propriedade;
    await prisma.propriedade.upsert({
      where: { id },
      update: data,
      create: propriedade,
    });
  }
}
