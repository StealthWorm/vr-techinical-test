import { ResourceNotFound } from './errors/resource-not-found-error';
import { InMemoryRegistrationsRepository } from '@infra/database/in-memory/in-memory-registrations-repository';
import { FindRegistrationByIdUseCase } from './find-registration-by-id';

let registrationsRepository: InMemoryRegistrationsRepository;
let sut: FindRegistrationByIdUseCase;

describe('Fetch Registration By Id Use Case', () => {
  beforeEach(async () => {
    registrationsRepository = new InMemoryRegistrationsRepository();
    sut = new FindRegistrationByIdUseCase(registrationsRepository);
  });

  it('should be able to get registration by Id', async () => {
    const created_reg = await registrationsRepository.create({
      codCourse: 'course-id-1',
      codStudent: 'student-id-1',
    });

    const { registration } = await sut.execute({
      id: created_reg.id,
    });

    expect(registration.codCourse).toBe('course-id-1');
    expect(registration.codStudent).toBe('student-id-1');
    expect(registration).toEqual(
      expect.objectContaining({
        codCourse: expect.any(String),
        codStudent: expect.any(String),
      }),
    );
  });

  it('should not be able to get an nonexisting student', async () => {
    await expect(() =>
      sut.execute({
        id: 'id-qualquer',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
