import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { StudentWithCourses } from 'src/application/use-cases/errors/student-with-courses-error';

@Catch(StudentWithCourses)
export class StudentWithCoursesExceptionFilter extends BaseExceptionFilter {
  catch(exception: StudentWithCourses, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(404).json({
      message: 'It is not possible to delete a student enrolled in a course.',
    });
  }
}
