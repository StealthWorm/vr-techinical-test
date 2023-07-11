import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { CoursesWithStudents } from 'src/application/use-cases/errors/course-with-students-error';

@Catch(CoursesWithStudents)
export class CoursesWithStudentsExceptionFilter extends BaseExceptionFilter {
  catch(exception: CoursesWithStudents, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(404).json({
      message: 'It is not possible to delete a course with students.',
    });
  }
}
