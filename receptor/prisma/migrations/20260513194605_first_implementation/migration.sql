-- CreateEnum
CREATE TYPE "TipoSaude" AS ENUM ('VACINA', 'MEDICAMENTO', 'EXAME', 'CIRURGIA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propriedade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Propriedade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leitor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "id_propriedade" TEXT NOT NULL,

    CONSTRAINT "Leitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "tag_rfid" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "id_propriedade" TEXT NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leitura" (
    "id" TEXT NOT NULL,
    "rssi" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_animal" TEXT NOT NULL,
    "id_leitor" TEXT NOT NULL,

    CONSTRAINT "Leitura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saude" (
    "id" TEXT NOT NULL,
    "tipo" "TipoSaude" NOT NULL,
    "descricao" TEXT,
    "data_aplicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_animal" TEXT NOT NULL,

    CONSTRAINT "Saude_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimentacao" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_animal" TEXT NOT NULL,
    "id_origem" TEXT NOT NULL,
    "id_destino" TEXT NOT NULL,

    CONSTRAINT "Movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Animal_tag_rfid_key" ON "Animal"("tag_rfid");

-- AddForeignKey
ALTER TABLE "Propriedade" ADD CONSTRAINT "Propriedade_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leitor" ADD CONSTRAINT "Leitor_id_propriedade_fkey" FOREIGN KEY ("id_propriedade") REFERENCES "Propriedade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_id_propriedade_fkey" FOREIGN KEY ("id_propriedade") REFERENCES "Propriedade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leitura" ADD CONSTRAINT "Leitura_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leitura" ADD CONSTRAINT "Leitura_id_leitor_fkey" FOREIGN KEY ("id_leitor") REFERENCES "Leitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saude" ADD CONSTRAINT "Saude_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_id_animal_fkey" FOREIGN KEY ("id_animal") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_id_origem_fkey" FOREIGN KEY ("id_origem") REFERENCES "Propriedade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_id_destino_fkey" FOREIGN KEY ("id_destino") REFERENCES "Propriedade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
