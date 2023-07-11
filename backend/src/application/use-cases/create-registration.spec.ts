import { InMemoryRegistrationsRepository } from '@infra/database/in-memory/in-memory-registrations-repository';
import { CreateRegistrationUseCase } from './create-registration';
import { InMemoryStudentsRepository } from '@infra/database/in-memory/in-memory-students-repository';
import { InMemoryCoursesRepository } from '@infra/database/in-memory/in-memory-courses-repository';
import { RegistrationAlreadyExists } from './errors/registration-already-exists-error';

let RegistrationRepository: InMemoryRegistrationsRepository;
let CourseRepository: InMemoryCoursesRepository;
let StudentRepository: InMemoryStudentsRepository;
let sut: CreateRegistrationUseCase;

describe('Create Registration Use Case', () => {
  beforeEach(async () => {
    CourseRepository = new InMemoryCoursesRepository();
    StudentRepository = new InMemoryStudentsRepository();
    RegistrationRepository = new InMemoryRegistrationsRepository();
    sut = new CreateRegistrationUseCase(RegistrationRepository);
  });

  it('should be able to create a new registration with an existing course and student', async () => {
    const student = await StudentRepository.create({
      name: 'Juca',
    });

    const course = await CourseRepository.create({
      description: 'Portugues',
      program: 'teste',
    });

    const registration = await sut.execute({
      codCourse: course.id,
      codStudent: student.id,
    });

    expect(registration.registration.id).toEqual(expect.any(String));
    expect(registration.registration.codCourse).toEqual(course.id);
  });

  it('should not be able to create a new registration with a course and student that already exists.', async () => {
    const student = await StudentRepository.create({
      name: 'Juca',
    });

    const course = await CourseRepository.create({
      description: 'Portugues',
      program: 'teste',
    });

    await sut.execute({
      codCourse: course.id,
      codStudent: student.id,
    });

    await expect(() =>
      sut.execute({
        codCourse: course.id,
        codStudent: student.id,
      }),
    ).rejects.toBeInstanceOf(RegistrationAlreadyExists);
  });
});
