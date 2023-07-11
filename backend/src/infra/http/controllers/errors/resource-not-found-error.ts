import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { ResourceNotFound } from 'src/application/use-cases/errors/resource-not-found-error';

@Catch(ResourceNotFound)
export class ResourceNotFoundExceptionFilter extends BaseExceptionFilter {
  catch(exception: ResourceNotFound, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(404).json({
      message: exception.message,
    });
  }
}
