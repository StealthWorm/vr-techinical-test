import { ResourceNotFound } from './errors/resource-not-found-error';
import { InMemoryStudentsRepository } from '@infra/database/in-memory/in-memory-students-repository';
import { FindStudentByIdUseCase } from './find-student-by-id';

let studentsRepository: InMemoryStudentsRepository;
let sut: FindStudentByIdUseCase;

describe('Fetch Student By Id Use Case', () => {
  beforeEach(async () => {
    studentsRepository = new InMemoryStudentsRepository();
    sut = new FindStudentByIdUseCase(studentsRepository);
  });

  it('should be able to get student by Id', async () => {
    const created_student = await studentsRepository.create({
      name: 'John Doe',
    });

    const { student } = await sut.execute({
      id: created_student.id,
    });

    expect(student.name).toEqual('John Doe');
  });

  it('should not be able to get an nonexisting student', async () => {
    await expect(() =>
      sut.execute({
        id: 'id-qualquer',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
