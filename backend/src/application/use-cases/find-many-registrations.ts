import { Injectable } from '@nestjs/common';
import { Registration } from '@application/entities/Registration';
import { RegistrationsRepository } from '@application/repositories/registration-repository';

interface FindManyRegistrationsResponse {
  registrations: Registration[];
}

@Injectable()
export class FindManyRegistrationUseCase {
  constructor(private registrationsRepository: RegistrationsRepository) {}

  async execute(): Promise<FindManyRegistrationsResponse> {
    const registrations = await this.registrationsRepository.findAll();

    return {
      registrations,
    };
  }
}
