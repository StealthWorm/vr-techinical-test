import { InMemoryCoursesRepository } from '@infra/database/in-memory/in-memory-courses-repository';
import { FindManyCoursesUseCase } from './find-many-courses';

let coursesRepository: InMemoryCoursesRepository;
let sut: FindManyCoursesUseCase;

describe('Fetch Courses Use Case', () => {
  beforeEach(async () => {
    coursesRepository = new InMemoryCoursesRepository();
    sut = new FindManyCoursesUseCase(coursesRepository);
  });

  it('should be able to fetch courses', async () => {
    await coursesRepository.create({
      description: 'Física',
      program: 'Course program',
    });
    await coursesRepository.create({
      description: 'Matemática',
      program: 'Course program 2',
    });
    await coursesRepository.create({
      description: 'Física 1',
      program: 'Course program',
    });

    const { courses } = await sut.execute({
      query: 'Física',
      page: 1,
    });

    expect(courses).toHaveLength(2);
    expect(courses).toEqual([
      expect.objectContaining({ description: 'Física' }),
      expect.objectContaining({ description: 'Física 1' }),
    ]);
  });

  it('should be able to fetch paginated courses', async () => {
    for (let i = 1; i <= 22; i++) {
      await coursesRepository.create({
        description: `Curso ${i}`,
        program: `Ementa  ${i}`,
      });
    }

    const { courses } = await sut.execute({
      query: '',
      page: 2,
    });

    expect(courses).toHaveLength(2);
    expect(courses).toEqual([
      expect.objectContaining({ description: 'Curso 21' }),
      expect.objectContaining({ description: 'Curso 22' }),
    ]);
  });
});
