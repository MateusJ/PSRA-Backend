import { PrismaClient } from "@prisma/client";

const usuarios = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    nome: "Mateus Machado",
    email: "mateus@example.com",
    senha: "senha123",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    nome: "Ana Souza",
    email: "ana@example.com",
    senha: "senha456",
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
