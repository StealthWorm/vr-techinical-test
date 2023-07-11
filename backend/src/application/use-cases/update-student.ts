import { Injectable } from '@nestjs/common';
import { ResourceNotFound } from './errors/resource-not-found-error';
import { StudentsRepository } from '@application/repositories/students-repository';
import { Student } from '@application/entities/Student';

interface UpdateStudentRequest {
  id: string;
  name: string;
}

interface UpdateStudentResponse {
  updated_student: Student;
}

@Injectable()
export class UpdateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(request: UpdateStudentRequest): Promise<UpdateStudentResponse> {
    const { id, name } = request;

    const existingStudent = await this.studentsRepository.findById(id);

    if (!existingStudent) {
      throw new ResourceNotFound('Student');
    }

    const updated_student = await this.studentsRepository.update(id, { name });

    return { updated_student };
  }
}
