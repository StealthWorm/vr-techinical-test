import { Injectable } from '@nestjs/common';
import { ResourceNotFound } from './errors/resource-not-found-error';
import { Registration } from '@application/entities/Registration';
import { RegistrationsRepository } from '@application/repositories/registration-repository';

interface FindRegistrationByIdRequest {
  id: string;
}

interface FindRegistrationByIdResponse {
  registration: Registration;
}

@Injectable()
export class FindRegistrationByIdUseCase {
  constructor(private coursesRepository: RegistrationsRepository) {}

  async execute(
    request: FindRegistrationByIdRequest,
  ): Promise<FindRegistrationByIdResponse> {
    const { id } = request;

    const registration = await this.coursesRepository.findByRegistrationId(id);

    if (!registration) {
      throw new ResourceNotFound('Registration');
    }

    return {
      registration,
    };
  }
}
