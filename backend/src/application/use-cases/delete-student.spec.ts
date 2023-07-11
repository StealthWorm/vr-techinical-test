import { ResourceNotFound } from './errors/resource-not-found-error';
import { InMemoryStudentsRepository } from '@infra/database/in-memory/in-memory-students-repository';
import { DeleteStudentUseCase } from './delete-student';
import { StudentWithCourses } from './errors/student-with-courses-error';

let StudentRepository: InMemoryStudentsRepository;
let sut: DeleteStudentUseCase;

describe('Delete Student Use Case', () => {
  beforeEach(() => {
    StudentRepository = new InMemoryStudentsRepository();
    sut = new DeleteStudentUseCase(StudentRepository);
  });

  it('should be able to delete an existing student', async () => {
    const student = await StudentRepository.create({
      name: 'Student',
    });

    await expect(sut.execute({ id: student.id })).resolves.toBeUndefined();
  });

  it('should not be able to delete a non existing student', async () => {
    await expect(() =>
      sut.execute({
        id: 'id-qualquer',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });

  it('should not be able to delete a students with courses', async () => {
    StudentRepository.findById = jest.fn().mockResolvedValueOnce({
      id: 'studentId',
      courses: ['course1', 'course2'],
    });

    await expect(sut.execute({ id: 'studentId' })).rejects.toBeInstanceOf(
      StudentWithCourses,
    );

    expect(StudentRepository.findById).toHaveBeenCalledWith('studentId');
  });
});
