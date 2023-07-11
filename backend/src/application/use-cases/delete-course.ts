import { Injectable } from '@nestjs/common';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { ResourceNotFound } from './errors/resource-not-found-error';
import { CoursesWithStudents } from './errors/course-with-students-error';

interface DeleteCourseRequest {
  id: string;
}

@Injectable()
export class DeleteCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(request: DeleteCourseRequest): Promise<void> {
    const { id } = request;

    const existingCourse = await this.coursesRepository.findById(id);

    if (!existingCourse) {
      throw new ResourceNotFound('Course');
    }

    if (existingCourse.students && existingCourse.students.length > 0) {
      throw new CoursesWithStudents();
    }

    await this.coursesRepository.delete(id);
  }
}
