import { Injectable } from '@nestjs/common';
import { ResourceNotFound } from './errors/resource-not-found-error';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { Course } from '@application/entities/Course';

interface UpdateCourseRequest {
  id: string;
  description: string;
  program: string;
}

interface UpdateCourseResponse {
  updated_course: Course;
}

@Injectable()
export class UpdateCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: UpdateCourseRequest): Promise<UpdateCourseResponse> {
    const { id, description, program } = request;

    const existingCourse = await this.coursesRepository.findById(id);

    if (!existingCourse) {
      throw new ResourceNotFound('Course');
    }

    const updated_course = await this.coursesRepository.update(id, {
      description,
      program,
    });

    return { updated_course };
  }
}
