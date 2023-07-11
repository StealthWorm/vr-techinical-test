import { ResourceNotFound } from './errors/resource-not-found-error';
import { InMemoryStudentsRepository } from '@infra/database/in-memory/in-memory-students-repository';
import { UpdateStudentUseCase } from './update-student';

let StudentRepository: InMemoryStudentsRepository;
let sut: UpdateStudentUseCase;

describe('Update Student Use Case', () => {
  beforeEach(() => {
    StudentRepository = new InMemoryStudentsRepository();
    sut = new UpdateStudentUseCase(StudentRepository);
  });

  it('should update an existing student.', async () => {
    const student = await StudentRepository.create({
      name: 'Old Name',
    });

    const { updated_student } = await sut.execute({
      id: student.id,
      name: 'New Name',
    });

    expect(updated_student.name).toEqual('New Name');
  });

  it('should not be able to update a non existing student.', async () => {
    await expect(() =>
      sut.execute({
        id: 'id-qualquer',
        name: 'new name',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
