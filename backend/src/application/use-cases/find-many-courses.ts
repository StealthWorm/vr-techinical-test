import { Injectable } from '@nestjs/common';
import { Course } from '@application/entities/Course';
import { CoursesRepository } from '@application/repositories/courses-repository';

interface FindManyCoursesRequest {
  query: string;
  page: number;
}

interface FindManyCoursesResponse {
  courses: Course[];
}

@Injectable()
export class FindManyCoursesUseCase {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(
    request: FindManyCoursesRequest,
  ): Promise<FindManyCoursesResponse> {
    const { query, page } = request;

    const courses = await this.coursesRepository.findMany(query, page);

    return {
      courses,
    };
  }
}
