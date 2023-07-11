import { InMemoryCoursesRepository } from '@infra/database/in-memory/in-memory-courses-repository';
import { UpdateCourseUseCase } from './update-course';
import { ResourceNotFound } from './errors/resource-not-found-error';

let CourseRepository: InMemoryCoursesRepository;
let sut: UpdateCourseUseCase;

describe('Update Course Use Case', () => {
  beforeEach(() => {
    CourseRepository = new InMemoryCoursesRepository();
    sut = new UpdateCourseUseCase(CourseRepository);
  });

  it('should update an existing course.', async () => {
    const course = await CourseRepository.create({
      description: 'Old Description',
      program: 'Old Program',
    });

    const { updated_course } = await sut.execute({
      id: course.id,
      description: 'New Description',
      program: 'New Program',
    });

    expect(updated_course.description).toEqual('New Description');
  });

  it('should not be able to update a non existing course.', async () => {
    await expect(() =>
      sut.execute({
        id: 'id-qualquer',
        description: 'new desvription',
        program: 'new program',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
