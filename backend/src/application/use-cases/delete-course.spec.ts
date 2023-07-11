import { InMemoryCoursesRepository } from '@infra/database/in-memory/in-memory-courses-repository';
import { DeleteCourseUseCase } from './delete-course';
import { ResourceNotFound } from './errors/resource-not-found-error';
import { CoursesWithStudents } from './errors/course-with-students-error';

let CourseRepository: InMemoryCoursesRepository;
let sut: DeleteCourseUseCase;

describe('Delete Course Use Case', () => {
  beforeEach(() => {
    CourseRepository = new InMemoryCoursesRepository();
    sut = new DeleteCourseUseCase(CourseRepository);
  });

  it('should be able to delete an existing course', async () => {
    const course = await CourseRepository.create({
      program: 'Matemática',
      description: 'Aulas de Matemática',
    });

    await expect(sut.execute({ id: course.id })).resolves.toBeUndefined();
  });

  it('should not be able to delete a non existing course', async () => {
    await expect(() =>
      sut.execute({
        id: 'id-qualquer',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });

  it('should not be able to delete a course with students', async () => {
    CourseRepository.findById = jest.fn().mockResolvedValueOnce({
      id: 'courseId',
      students: ['student1', 'student2'],
    });

    await expect(sut.execute({ id: 'courseId' })).rejects.toBeInstanceOf(
      CoursesWithStudents,
    );

    expect(CourseRepository.findById).toHaveBeenCalledWith('courseId');
  });
});
