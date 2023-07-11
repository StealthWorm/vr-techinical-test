import { InMemoryRegistrationsRepository } from '@infra/database/in-memory/in-memory-registrations-repository';
import { FindManyRegistrationUseCase } from './find-many-registrations';

let registrationsRepository: InMemoryRegistrationsRepository;
let sut: FindManyRegistrationUseCase;

describe('Fetch Registrations Use Case', () => {
  beforeEach(async () => {
    registrationsRepository = new InMemoryRegistrationsRepository();
    sut = new FindManyRegistrationUseCase(registrationsRepository);
  });

  it('should be able to fetch registrations', async () => {
    await registrationsRepository.create({
      codCourse: 'id-1',
      codStudent: 'id-1',
    });
    await registrationsRepository.create({
      codCourse: 'id-1',
      codStudent: 'id-2',
    });
    await registrationsRepository.create({
      codCourse: 'id-2',
      codStudent: 'id-1',
    });

    const response = await sut.execute();

    expect(response.registrations.length).toEqual(3);
  });
});
