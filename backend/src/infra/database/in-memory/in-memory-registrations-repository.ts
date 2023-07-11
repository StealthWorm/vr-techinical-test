import { Registration } from '@application/entities/Registration';
import { RegistrationsRepository } from '@application/repositories/registration-repository';
import { CreateRegistration } from '@infra/http/dtos/create-registration';

export class InMemoryRegistrationsRepository
  implements RegistrationsRepository
{
  public items: Registration[] = [];

  async create({ codCourse, codStudent }: CreateRegistration) {
    const reg = new Registration({
      codCourse: codCourse,
      codStudent: codStudent,
    });

    this.items.push(reg);

    return reg;
  }

  async delete(registrationId: string) {
    const index = this.items.findIndex((item) => item.id === registrationId);

    this.items.splice(index, 1);
  }

  async findAll() {
    return this.items;
  }

  async findByIds(courseId: string, studentId: string) {
    const registration = this.items.find(
      (item) => item.codCourse === courseId && item.codStudent === studentId,
    );

    if (!registration) {
      return null;
    }

    return registration;
  }

  async findByRegistrationId(registration_id: string) {
    const registration = this.items.find((item) => item.id === registration_id);

    if (!registration) {
      return null;
    }

    return registration;
  }
}
