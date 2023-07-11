import { CursoAluno as RawCursoAluno } from '@prisma/client';
import { Registration } from 'src/application/entities/Registration';

export class PrismaRegistrationMapper {
  static toPrisma(reg: Registration) {
    return {
      codigoAluno: reg.codStudent,
      codigoCurso: reg.codCourse,
      createdAt: reg.createdAt,
    }; // as Prisma.CursoAlunoCountOrderByAggregateInput;
  }

  static toDomain(raw: RawCursoAluno): Registration {
    return new Registration(
      {
        codCourse: raw.codigoCurso,
        codStudent: raw.codigoAluno,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
