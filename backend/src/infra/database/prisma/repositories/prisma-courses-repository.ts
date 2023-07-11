import { CoursesRepository } from '@application/repositories/courses-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Course } from '@application/entities/Course';
import { PrismaCourseMapper } from '../mappers/prisma-course-mapper';
import { CreateCourse } from '@infra/http/dtos/create-course';
import { Registration } from '@application/entities/Registration';

@Injectable()
export class PrismaCoursesRepository implements CoursesRepository {
  constructor(private prisma: PrismaService) {}

  async create(course: Course) {
    const raw = PrismaCourseMapper.toPrisma(course);

    const course_created = await this.prisma.curso.create({
      data: raw,
    });

    return PrismaCourseMapper.toDomain(course_created);
  }

  async findById(id: string) {
    let registrations: Registration[];
    let mapped_course: Course;

    const curso = await this.prisma.curso.findUnique({
      where: {
        codigo: id,
      },
      include: {
        cursoAlunos: true,
      },
    });

    if (!curso) {
      return null;
    }

    if (curso.cursoAlunos) {
      registrations = curso.cursoAlunos.map(
        PrismaCourseMapper.PrismaMapCursoAlunoToRegistration,
      );

      mapped_course = PrismaCourseMapper.toDomain(curso);
      mapped_course.students = registrations;
    } else {
      mapped_course = PrismaCourseMapper.toDomain(curso);
    }

    return mapped_course;
  }

  async findMany(query: string, page: number) {
    const courses = await this.prisma.curso.findMany({
      where: {
        descricao: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        cursoAlunos: true,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    const mappedCourses = courses.map((curso) =>
      PrismaCourseMapper.toDomain(curso),
    );

    return mappedCourses;
  }

  async update(id: string, data: CreateCourse) {
    const updatedRawCourse = await this.prisma.curso.update({
      where: {
        codigo: id,
      },
      data: {
        descricao: data.description,
        ementa: data.program,
      },
    });

    return PrismaCourseMapper.toDomain(updatedRawCourse);
  }

  async delete(id: string) {
    await this.prisma.curso.delete({
      where: {
        codigo: id,
      },
    });
  }
}
