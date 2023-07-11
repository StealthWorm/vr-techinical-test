import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { RegistrationAlreadyExists } from 'src/application/use-cases/errors/registration-already-exists-error';

@Catch(RegistrationAlreadyExists)
export class RegistrationAlreadyExistsExceptionFilter extends BaseExceptionFilter {
  catch(exception: RegistrationAlreadyExists, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400).json({
      message:
        'A Registration to this student into that course already exists.',
    });
  }
}
