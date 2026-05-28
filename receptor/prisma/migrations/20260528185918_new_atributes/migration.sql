/*
  Warnings:

  - Added the required column `data_insercao_rfid` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pelagem` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnpj_cpf_responsavel` to the `Propriedade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registro_estadual` to the `Propriedade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `veterinario_responsavel` to the `Saude` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "altura_nascimento_cm" DOUBLE PRECISION,
ADD COLUMN     "data_abate" TIMESTAMP(3),
ADD COLUMN     "data_insercao_rfid" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pelagem" TEXT NOT NULL,
ADD COLUMN     "peso_nascimento_kg" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Propriedade" ADD COLUMN     "cnpj_cpf_responsavel" TEXT NOT NULL,
ADD COLUMN     "registro_estadual" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Saude" ADD COLUMN     "veterinario_responsavel" TEXT NOT NULL;
