import { InMemoryStudentsRepository } from '@infra/database/in-memory/in-memory-students-repository';
import { CreateStudentUseCase } from './create-student';

let StudentRepository: InMemoryStudentsRepository;
let sut: CreateStudentUseCase;

describe('Create Student Use Case', () => {
  beforeEach(() => {
    StudentRepository = new InMemoryStudentsRepository();
    sut = new CreateStudentUseCase(StudentRepository);
  });

  it('should be able to create a new student', async () => {
    const { student } = await sut.execute({
      name: 'Student',
    });

    expect(student.id).toEqual(expect.any(String));
    expect(student.name).toEqual('Student');
  });
});
