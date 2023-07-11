import { Injectable } from '@nestjs/common';
import { StudentsRepository } from '@application/repositories/students-repository';
import { ResourceNotFound } from './errors/resource-not-found-error';
import { StudentWithCourses } from './errors/student-with-courses-error';

interface DeleteStudentRequest {
  id: string;
}

@Injectable()
export class DeleteStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(request: DeleteStudentRequest): Promise<void> {
    const { id } = request;

    const existingStudent = await this.studentsRepository.findById(id);

    if (!existingStudent) {
      throw new ResourceNotFound('Course');
    }

    if (existingStudent.courses && existingStudent.courses.length > 0) {
      throw new StudentWithCourses();
    }

    await this.studentsRepository.delete(id);
  }
}
