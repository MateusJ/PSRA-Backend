import { PrismaClient } from '@prisma/client';

const propriedades = [
  {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    nome: 'Fazenda Boa Vista',
    id_usuario: '11111111-1111-1111-1111-111111111111',
    latitude: -23.55052,
    longitude: -46.633308,
  },
  {
    id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    nome: 'Sitio Primavera',
    id_usuario: '22222222-2222-2222-2222-222222222222',
    latitude: -22.906847,
    longitude: -43.172897,
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
