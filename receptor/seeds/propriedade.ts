import { PrismaClient } from "@prisma/client";

const propriedades = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    nome: "Propriedade A",
    id_usuario: "11111111-1111-1111-1111-111111111111",
    latitude: -12.3456,
    longitude: -45.6789,
    cnpj_cpf_responsavel: "123.456.789-00",
    registro_estadual: "SISBOV-A1",
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    nome: "Propriedade B",
    id_usuario: "11111111-1111-1111-1111-111111111111",
    latitude: -11.2233,
    longitude: -44.5566,
    cnpj_cpf_responsavel: "987.654.321-00",
    registro_estadual: "SIGEN-B2",
  },
  {
    id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    nome: "Propriedade C",
    id_usuario: "11111111-1111-1111-1111-111111111111",
    latitude: -10.1111,
    longitude: -43.2222,
    cnpj_cpf_responsavel: "11.222.333/0001-44",
    registro_estadual: "SISBOV-C3",
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
