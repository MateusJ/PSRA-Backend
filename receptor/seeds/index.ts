import { PrismaClient } from "@prisma/client";
import { seedUsuario } from "./usuario";
import { seedPropriedade } from "./propriedade";
import { seedLeitor } from "./leitor";
import { seedAnimal } from "./animal";
import { seedLeitura } from "./leitura";
import { seedSaude } from "./saude";
import { seedMovimentacao } from "./movimentacao";

const prisma = new PrismaClient();

async function main() {
  await seedUsuario(prisma);
  await seedPropriedade(prisma);
  await seedLeitor(prisma);
  await seedAnimal(prisma);
  await seedLeitura(prisma);
  await seedSaude(prisma);
  await seedMovimentacao(prisma);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
