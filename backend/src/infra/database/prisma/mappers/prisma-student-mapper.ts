import { Registration } from '@application/entities/Registration';
import { CursoAluno, Prisma, Aluno as RawAluno } from '@prisma/client';
import { Student } from 'src/application/entities/Student';

export class PrismaStudentMapper {
  static toPrisma(student: Student) {
    return {
      codigo: student.id,
      nome: student.name,
      cursos: student.courses,
      createdAt: student.createdAt,
    } as Prisma.AlunoCreateWithoutCursosInput;
  }

  static toDomain(raw: RawAluno): Student {
    return new Student(
      {
        name: raw.nome,
        createdAt: raw.createdAt,
      },
      raw.codigo,
    );
  }

  static PrismaMapStudentCoursesToRegistration(
    cursoAluno: CursoAluno,
  ): Registration {
    return new Registration({
      codCourse: cursoAluno.codigoCurso,
      codStudent: cursoAluno.codigoAluno,
      createdAt: cursoAluno.createdAt,
    });
  }
}
