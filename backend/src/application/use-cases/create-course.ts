import { Injectable } from '@nestjs/common';
import { Course } from '../entities/course';
import { CoursesRepository } from '@application/repositories/courses-repository';

interface CreateCourseRequest {
  description: string;
  program: string;
}

interface CreateCourseResponse {
  course: Course;
}

@Injectable()
export class CreateCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: CreateCourseRequest): Promise<CreateCourseResponse> {
    const { program, description } = request;

    const course = new Course({
      program,
      description,
    });

    await this.coursesRepository.create(course);

    return {
      course,
    };
  }
}
