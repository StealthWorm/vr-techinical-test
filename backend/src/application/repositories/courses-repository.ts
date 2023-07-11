import { Course } from '@application/entities/Course';
import { CreateCourse } from '@infra/http/dtos/create-course';

export abstract class CoursesRepository {
  abstract create(student: Course): Promise<Course>;
  abstract findById(id: string): Promise<Course | null>;
  abstract findMany(query: string, page: number): Promise<Course[]>;
  abstract update(id: string, data: CreateCourse): Promise<Course>;
  abstract delete(id: string): Promise<void>;
}
