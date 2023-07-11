-- CreateTable
CREATE TABLE "courses" (
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "ementa" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "students" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "registrations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codigoAluno" TEXT NOT NULL,
    "codigoCurso" TEXT NOT NULL,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "courses_descricao_idx" ON "courses"("descricao");

-- CreateIndex
CREATE INDEX "students_nome_idx" ON "students"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_codigoAluno_codigoCurso_key" ON "registrations"("codigoAluno", "codigoCurso");

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_codigoAluno_fkey" FOREIGN KEY ("codigoAluno") REFERENCES "students"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_codigoCurso_fkey" FOREIGN KEY ("codigoCurso") REFERENCES "courses"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
