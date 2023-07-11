import { Student } from '@application/entities/Student';
import { StudentsRepository } from '@application/repositories/students-repository';
import { CreateStudent } from '@infra/http/dtos/create-student';

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = [];

  async create(data: CreateStudent) {
    const student = new Student({
      name: data.name,
    });

    this.items.push(student);

    return student;
  }

  async findById(id: string) {
    const student = this.items.find((item) => item.id === id);

    if (!student) {
      return null;
    }

    return student;
  }

  async findMany(query: string, page: number) {
    return this.items
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async update(id: string, data: CreateStudent) {
    const index = this.items.findIndex((item) => item.id === id);

    this.items[index].name = data.name;

    return this.items[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);

    this.items.splice(index, 1);
  }
}
