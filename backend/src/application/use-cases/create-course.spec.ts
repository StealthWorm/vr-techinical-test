import { InMemoryCoursesRepository } from '@infra/database/in-memory/in-memory-courses-repository';
import { CreateCourseUseCase } from './create-course';

let CourseRepository: InMemoryCoursesRepository;
let sut: CreateCourseUseCase;

describe('Create Course Use Case', () => {
  beforeEach(() => {
    CourseRepository = new InMemoryCoursesRepository();
    sut = new CreateCourseUseCase(CourseRepository);
  });

  it('should be able to create a new course', async () => {
    const { course } = await sut.execute({
      program: 'Matemática',
      description: 'Aulas de Matemática',
    });

    expect(course.id).toEqual(expect.any(String));
    expect(course.program).toEqual('Matemática');
  });
});
