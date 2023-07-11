import { Course } from '@application/entities/Course';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { CreateCourse } from '@infra/http/dtos/create-course';

export class InMemoryCoursesRepository implements CoursesRepository {
  public items: Course[] = [];

  async create(data: CreateCourse) {
    const course = new Course({
      description: data.description,
      program: data.program,
    });

    this.items.push(course);

    return course;
  }

  async findById(id: string) {
    const course = this.items.find((item) => item.id === id);

    if (!course) {
      return null;
    }

    return course;
  }

  async findMany(query: string, page: number) {
    return this.items
      .filter((item) => item.description.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async update(id: string, data: CreateCourse) {
    const index = this.items.findIndex((item) => item.id === id);

    this.items[index].description = data.description;
    this.items[index].program = data.program;

    return this.items[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);

    this.items.splice(index, 1);
  }
}
