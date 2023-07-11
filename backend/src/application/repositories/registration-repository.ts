import { Registration } from '@application/entities/Registration';
import { CreateRegistration } from '@infra/http/dtos/create-registration';

export abstract class RegistrationsRepository {
  abstract create({
    codCourse,
    codStudent,
  }: CreateRegistration): Promise<Registration>;
  abstract delete(registrationId: string): Promise<void>;
  abstract findAll(): Promise<any[]>;
  abstract findByIds(
    courseId: string,
    studentId: string,
  ): Promise<Registration | null>;
  abstract findByRegistrationId(
    registration_id: string,
  ): Promise<Registration | null>;
}
