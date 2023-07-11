import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegistrationsRepository } from '@application/repositories/registration-repository';
import { PrismaRegistrationMapper } from '../mappers/prisma-registration-mapper';
import { CreateRegistration } from '@infra/http/dtos/create-registration';

@Injectable()
export class PrismaRegistrationsRepository implements RegistrationsRepository {
  constructor(private prisma: PrismaService) {}

  async create({ codCourse, codStudent }: CreateRegistration) {
    const reg = await this.prisma.cursoAluno.create({
      data: {
        codigoAluno: codStudent,
        codigoCurso: codCourse,
      },
    });

    return PrismaRegistrationMapper.toDomain(reg);
  }

  async delete(registrationId: string) {
    await this.prisma.cursoAluno.delete({
      where: {
        id: registrationId,
      },
    });
  }

  async findByIds(courseId: string, studentId: string) {
    const registration = await this.prisma.cursoAluno.findUnique({
      where: {
        codigoAluno_codigoCurso: {
          codigoAluno: studentId,
          codigoCurso: courseId,
        },
      },
    });

    if (!registration) {
      return null;
    }

    return PrismaRegistrationMapper.toDomain(registration);
  }

  async findByRegistrationId(registration_id: string) {
    const registration = await this.prisma.cursoAluno.findUnique({
      where: {
        id: registration_id,
      },
    });

    if (!registration) {
      return null;
    }

    return PrismaRegistrationMapper.toDomain(registration);
  }

  async findAll() {
    const cursoAlunoData = await this.prisma.cursoAluno.findMany({
      include: {
        curso: true,
        aluno: true,
      },
    });

    return cursoAlunoData;
  }
}
