import { Injectable } from '@nestjs/common';
import { ResourceNotFound } from './errors/resource-not-found-error';
import { Student } from '@application/entities/Student';
import { StudentsRepository } from '@application/repositories/students-repository';

interface FindStudentByIdRequest {
  id: string;
}

interface FindStudentByIdResponse {
  student: Student;
}

@Injectable()
export class FindStudentByIdUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(
    request: FindStudentByIdRequest,
  ): Promise<FindStudentByIdResponse> {
    const { id } = request;

    const student = await this.studentsRepository.findById(id);

    if (!student) {
      throw new ResourceNotFound('Student');
    }

    return {
      student,
    };
  }
}
