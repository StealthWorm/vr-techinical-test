import { ResourceNotFound } from './errors/resource-not-found-error';
import { InMemoryRegistrationsRepository } from '@infra/database/in-memory/in-memory-registrations-repository';
import { DeleteRegistrationUseCase } from './delete-registration';

let RegistrationRepository: InMemoryRegistrationsRepository;
let sut: DeleteRegistrationUseCase;

describe('Delete Registration Use Case', () => {
  beforeEach(() => {
    RegistrationRepository = new InMemoryRegistrationsRepository();
    sut = new DeleteRegistrationUseCase(RegistrationRepository);
  });

  it('should be able to delete an existing registration between a student and a course', async () => {
    RegistrationRepository.findByRegistrationId = jest
      .fn()
      .mockResolvedValueOnce({
        registration_id: 'registrationId',
      });
    RegistrationRepository.delete = jest.fn().mockResolvedValueOnce(null);

    await expect(
      sut.execute({ registration_id: 'registrationId' }),
    ).resolves.toBeUndefined();

    expect(RegistrationRepository.delete).toHaveBeenCalledWith(
      'registrationId',
    );
  });

  it('should  not be able to delete a registration that does not exist.', async () => {
    await expect(() =>
      sut.execute({
        registration_id: 'id-qualquer',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
