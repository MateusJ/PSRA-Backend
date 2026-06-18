import { PrismaClient } from "@prisma/client";

const usuarios = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    nome: "Usuario Teste Principal",
    email: "usuario.teste@example.com",
    senha: "senha123",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    nome: "Usuario Generico 1",
    email: "generico1@example.com",
    senha: "senha456",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    nome: "Usuario Generico 2",
    email: "generico2@example.com",
    senha: "senha789",
  },
];

export async function seedUsuario(prisma: PrismaClient) {
  for (const usuario of usuarios) {
    const { id, ...data } = usuario;
    await prisma.usuario.upsert({
      where: { id },
      update: data,
      create: usuario,
    });
  }
}
