import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const firstStudentId = '0730ffac-d039-4194-9571-01aa2aa0efbd';
const firstStudentCreationDate = new Date('2022-12-31T03:00:00.000');

const secondStudentId = '00880d75-a933-4fef-94ab-e05744435297';
const secondStudentCreationDate = new Date('2023-01-03T03:00:00.000');

const thirdStudentId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00';
const thirdStudentCreationDate = new Date('2023-01-08T03:00:00.000');

const firstCourseId = 'd8b5d79c-7c62-475a-b36f-a97324221819';
const firstCourseCreationDate = new Date('2022-12-31T03:00:00.000');

const secondCourseId = 'e0bfdd68-0758-4b51-a952-9d6a30b12b36';
const secondCourseCreationDate = new Date('2023-01-03T03:00:00.000');

const thirdCourseId = 'c7735353-4088-4165-bcd1-855b2b854270';
const thirdCourseCreationDate = new Date('2023-01-08T03:00:00.000');

async function run() {
  await prisma.aluno.deleteMany();
  await prisma.curso.deleteMany();

  // Create Students
  await Promise.all([
    prisma.aluno.create({
      data: {
        codigo: firstStudentId,
        nome: 'João Vitor',
        createdAt: firstStudentCreationDate,
      },
    }),
    prisma.aluno.create({
      data: {
        codigo: secondStudentId,
        nome: 'Maria Clara',
        createdAt: secondStudentCreationDate,
      },
    }),
    prisma.aluno.create({
      data: {
        codigo: thirdStudentId,
        nome: 'João Pereira',
        createdAt: thirdStudentCreationDate,
      },
    }),
  ]);

  // Create Courses
  await Promise.all([
    prisma.curso.create({
      data: {
        codigo: firstCourseId,
        descricao: 'Matemática',
        ementa: 'Cursos de cálculo',
        createdAt: firstCourseCreationDate,
      },
    }),
    prisma.curso.create({
      data: {
        codigo: secondCourseId,
        descricao: 'Física',
        ementa: 'Cursos de fisica',
        createdAt: secondCourseCreationDate,
      },
    }),
    prisma.curso.create({
      data: {
        codigo: thirdCourseId,
        descricao: 'Inglês',
        ementa: 'Cursos de Ingles',
        createdAt: thirdCourseCreationDate,
      },
    }),
  ]);

  // Registrations
  prisma.cursoAluno.create({
    data: {
      codigoAluno: firstStudentId,
      codigoCurso: firstCourseId,
      createdAt: firstStudentCreationDate,
    },
  });
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
