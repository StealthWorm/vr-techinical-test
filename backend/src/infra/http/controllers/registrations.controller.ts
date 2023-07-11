import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ResourceNotFoundExceptionFilter } from './errors/resource-not-found-error';
import { RegistrationAlreadyExistsExceptionFilter } from './errors/registration-already-exists-error';
import { CreateRegistrationUseCase } from '@application/use-cases/create-registration';
import { DeleteRegistrationUseCase } from '@application/use-cases/delete-registration';
import { FindManyRegistrationUseCase } from '@application/use-cases/find-many-registrations';
import { CreateRegistration } from '../dtos/create-registration';
import { FindRegistrationByIdUseCase } from '@application/use-cases/find-registration-by-id';

@Controller('registrations')
@UseFilters(
  ResourceNotFoundExceptionFilter,
  RegistrationAlreadyExistsExceptionFilter,
)
export class RegistrationsController {
  constructor(
    private createRegistration: CreateRegistrationUseCase,
    private deleteRegistration: DeleteRegistrationUseCase,
    private getRegistrations: FindManyRegistrationUseCase,
    private getRegistrationsById: FindRegistrationByIdUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateRegistration) {
    const { codCourse, codStudent } = body;

    const { registration } = await this.createRegistration.execute({
      codCourse,
      codStudent,
    });

    return {
      registration,
    };
  }

  @Get()
  async findAll() {
    const { registrations } = await this.getRegistrations.execute();

    return {
      registrations,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const { registration } = await this.getRegistrationsById.execute({ id });

    return {
      registration,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteRegistration.execute({ registration_id: id });
  }
}
