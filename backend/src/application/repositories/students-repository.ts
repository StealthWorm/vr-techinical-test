// ao fazer injeção de dependencia, se eu uso interface ao inves de abstract class
// ele nao consegue fazer injeção de modo automatizado, pois o JS nao consegue ler o nome da interface
// que é algo especifico do typescript. A interface não existe depois que o codigo é compilado pro JS
import { Student } from '@application/entities/Student';
import { CreateStudent } from '@infra/http/dtos/create-student';

export abstract class StudentsRepository {
  abstract create(student: Student): Promise<Student>;
  abstract findById(id: string): Promise<Student | null>;
  abstract findMany(query: string, page: number): Promise<Student[]>;
  abstract update(id: string, data: CreateStudent): Promise<Student>;
  abstract delete(id: string): Promise<void>;
}
