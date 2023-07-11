import { Registration } from '@application/entities/Registration';
import { RegistrationsRepository } from '@application/repositories/registration-repository';
import { Injectable } from '@nestjs/common';
import { RegistrationAlreadyExists } from './errors/registration-already-exists-error';

interface CreateRegistrationRequest {
  codCourse: string;
  codStudent: string;
}

interface CreateRegistrationResponse {
  registration: Registration;
}

@Injectable()
export class CreateRegistrationUseCase {
  constructor(private registrationsRepository: RegistrationsRepository) {}

  async execute(
    request: CreateRegistrationRequest,
  ): Promise<CreateRegistrationResponse> {
    const { codStudent, codCourse } = request;

    const existingRegistration = await this.registrationsRepository.findByIds(
      codCourse,
      codStudent,
    );

    if (existingRegistration) {
      throw new RegistrationAlreadyExists();
    }

    const registration = new Registration({
      codStudent,
      codCourse,
    });

    await this.registrationsRepository.create({ codCourse, codStudent });

    return { registration };
  }
}
