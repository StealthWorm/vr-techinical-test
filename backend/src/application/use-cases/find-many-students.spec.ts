import { InMemoryStudentsRepository } from '@infra/database/in-memory/in-memory-students-repository';
import { FindManyStudentsUseCase } from './find-many-students';

let studentsRepository: InMemoryStudentsRepository;
let sut: FindManyStudentsUseCase;

describe('Fetch Students Use Case', () => {
  beforeEach(async () => {
    studentsRepository = new InMemoryStudentsRepository();
    sut = new FindManyStudentsUseCase(studentsRepository);
  });

  it('should be able to fetch students', async () => {
    await studentsRepository.create({
      name: 'João Silva',
    });
    await studentsRepository.create({
      name: 'Cecília Silva',
    });
    await studentsRepository.create({
      name: 'Joana Pereira',
    });

    const { students } = await sut.execute({
      query: 'Silva',
      page: 1,
    });

    expect(students).toHaveLength(2);
    expect(students).toEqual([
      expect.objectContaining({ name: 'João Silva' }),
      expect.objectContaining({ name: 'Cecília Silva' }),
    ]);
  });

  it('should be able to fetch paginated students', async () => {
    for (let i = 1; i <= 22; i++) {
      await studentsRepository.create({
        name: `Aluno ${i}`,
      });
    }

    const { students } = await sut.execute({
      query: '',
      page: 2,
    });

    expect(students).toHaveLength(2);
    expect(students).toEqual([
      expect.objectContaining({ name: 'Aluno 21' }),
      expect.objectContaining({ name: 'Aluno 22' }),
    ]);
  });
});
