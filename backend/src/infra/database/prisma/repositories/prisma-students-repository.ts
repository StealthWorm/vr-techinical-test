import { StudentsRepository } from '@application/repositories/students-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Student } from '@application/entities/Student';
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper';
import { Registration } from '@application/entities/Registration';

@Injectable()
export class PrismaStudentRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(student: Student) {
    const raw = PrismaStudentMapper.toPrisma(student);

    const student_created = await this.prisma.aluno.create({
      data: raw,
    });

    return PrismaStudentMapper.toDomain(student_created);
  }

  async findById(id: string) {
    let registrations: Registration[];
    let mapped_student: Student;

    const student = await this.prisma.aluno.findUnique({
      where: {
        codigo: id,
      },
      include: {
        cursos: true,
      },
    });

    if (!student) {
      return null;
    }

    if (student.cursos) {
      registrations = student.cursos.map(
        PrismaStudentMapper.PrismaMapStudentCoursesToRegistration,
      );

      mapped_student = PrismaStudentMapper.toDomain(student);
      mapped_student.courses = registrations;
    } else {
      mapped_student = PrismaStudentMapper.toDomain(student);
    }

    return mapped_student;
  }

  async findMany(query: string, page: number) {
    const students = await this.prisma.aluno.findMany({
      where: {
        nome: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    const mappedStudents = students.map((student) =>
      PrismaStudentMapper.toDomain(student),
    );

    return mappedStudents;
  }

  async update(id: string, data: Student) {
    const prismaStudent = PrismaStudentMapper.toPrisma(data);

    const updatedRawStudent = await this.prisma.aluno.update({
      where: {
        codigo: id,
      },
      data: prismaStudent,
    });

    return PrismaStudentMapper.toDomain(updatedRawStudent);
  }

  async delete(id: string) {
    await this.prisma.aluno.delete({
      where: {
        codigo: id,
      },
    });
  }
}
