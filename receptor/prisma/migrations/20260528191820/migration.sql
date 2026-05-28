-- AlterTable
ALTER TABLE "Movimentacao" ADD COLUMN     "motivo" TEXT,
ADD COLUMN     "pendente_dados" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "responsavel_cpf" TEXT,
ADD COLUMN     "responsavel_nome" TEXT;
