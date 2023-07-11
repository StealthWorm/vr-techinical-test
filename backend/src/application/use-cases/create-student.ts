import { Injectable } from '@nestjs/common';
import { Student } from '@application/entities/Student';
import { StudentsRepository } from '@application/repositories/students-repository';

interface CreateStudentRequest {
  name: string;
}

interface CreateStudentResponse {
  student: Student;
}

@Injectable()
export class CreateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
    const { name } = request;

    const student = new Student({
      name,
    });

    await this.studentsRepository.create(student);

    return {
      student,
    };
  }
}
