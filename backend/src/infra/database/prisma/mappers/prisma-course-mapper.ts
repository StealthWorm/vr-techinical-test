import { Registration } from '@application/entities/Registration';
import { CursoAluno, Curso as RawCurso } from '@prisma/client';
import { Course } from 'src/application/entities/course';

export class PrismaCourseMapper {
  static toPrisma(course: Course) {
    return {
      codigo: course.id,
      descricao: course.description,
      ementa: course.program,
      createdAt: course.createdAt,
    };
  }

  static toDomain(raw: RawCurso): Course {
    return new Course(
      {
        description: raw.descricao,
        program: raw.ementa,
        createdAt: raw.createdAt,
      },
      raw.codigo,
    );
  }

  static PrismaMapCursoAlunoToRegistration(
    cursoAluno: CursoAluno,
  ): Registration {
    return new Registration({
      codCourse: cursoAluno.codigoCurso,
      codStudent: cursoAluno.codigoAluno,
      createdAt: cursoAluno.createdAt,
    });
  }
}
