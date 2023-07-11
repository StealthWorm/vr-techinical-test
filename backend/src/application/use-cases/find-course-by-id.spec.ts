import { InMemoryCoursesRepository } from '@infra/database/in-memory/in-memory-courses-repository';
import { FindCourseByIdUseCase } from './find-course-by-id';
import { ResourceNotFound } from './errors/resource-not-found-error';

let coursesRepository: InMemoryCoursesRepository;
let sut: FindCourseByIdUseCase;

describe('Fetch Course By Id Use Case', () => {
  beforeEach(async () => {
    coursesRepository = new InMemoryCoursesRepository();
    sut = new FindCourseByIdUseCase(coursesRepository);
  });

  it('should be able to get course by Id', async () => {
    const created_course = await coursesRepository.create({
      description: 'Física',
      program: 'Course program',
    });

    const { course } = await sut.execute({
      id: created_course.id,
    });

    expect(course.description).toEqual('Física');
  });

  it('should not be able to get an nonexisting course', async () => {
    await expect(() =>
      sut.execute({
        id: 'id-qualquer',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
