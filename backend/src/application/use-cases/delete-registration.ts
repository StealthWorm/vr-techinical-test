import { Injectable } from '@nestjs/common';
import { RegistrationsRepository } from '@application/repositories/registration-repository';
import { ResourceNotFound } from './errors/resource-not-found-error';

interface DeleteRegistrationRequest {
  registration_id: string;
}

@Injectable()
export class DeleteRegistrationUseCase {
  constructor(private registrationRepository: RegistrationsRepository) {}

  async execute(request: DeleteRegistrationRequest): Promise<void> {
    const { registration_id } = request;

    const existingRegistration =
      await this.registrationRepository.findByRegistrationId(registration_id);

    if (!existingRegistration) {
      throw new ResourceNotFound('Registration');
    }

    await this.registrationRepository.delete(registration_id);
  }
}
