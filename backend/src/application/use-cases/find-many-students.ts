import { Injectable } from '@nestjs/common';
import { Student } from '@application/entities/Student';
import { StudentsRepository } from '@application/repositories/students-repository';

interface FindManyStudentsRequest {
  query: string;
  page: number;
}

interface FindManyStudentsResponse {
  students: Student[];
}

@Injectable()
export class FindManyStudentsUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(
    request: FindManyStudentsRequest,
  ): Promise<FindManyStudentsResponse> {
    const { query, page } = request;

    const students = await this.studentsRepository.findMany(query, page);

    return {
      students,
    };
  }
}
