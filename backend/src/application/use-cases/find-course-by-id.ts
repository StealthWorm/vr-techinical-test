import { Injectable } from '@nestjs/common';
import { Course } from '@application/entities/Course';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { ResourceNotFound } from './errors/resource-not-found-error';

interface FindCourseByIdRequest {
  id: string;
}

interface FindCourseByIdResponse {
  course: Course;
}

@Injectable()
export class FindCourseByIdUseCase {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(
    request: FindCourseByIdRequest,
  ): Promise<FindCourseByIdResponse> {
    const { id } = request;

    const course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new ResourceNotFound('Course');
    }

    return {
      course,
    };
  }
}
