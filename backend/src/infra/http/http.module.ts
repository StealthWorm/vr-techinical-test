import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { StudentsController } from './controllers/students.controller';
import { CoursesController } from './controllers/courses.controller';
import { RegistrationsController } from './controllers/registrations.controller';
import { CreateStudentUseCase } from '@application/use-cases/create-student';
import { DeleteStudentUseCase } from '@application/use-cases/delete-student';
import { UpdateStudentUseCase } from '@application/use-cases/update-student';
import { FindManyStudentsUseCase } from '@application/use-cases/find-many-students';
import { CreateCourseUseCase } from '@application/use-cases/create-course';
import { DeleteCourseUseCase } from '@application/use-cases/delete-course';
import { UpdateCourseUseCase } from '@application/use-cases/update-course';
import { FindManyCoursesUseCase } from '@application/use-cases/find-many-courses';
import { CreateRegistrationUseCase } from '@application/use-cases/create-registration';
import { DeleteRegistrationUseCase } from '@application/use-cases/delete-registration';
import { FindManyRegistrationUseCase } from '@application/use-cases/find-many-registrations';
import { FindCourseByIdUseCase } from '@application/use-cases/find-course-by-id';
import { FindStudentByIdUseCase } from '@application/use-cases/find-student-by-id';
import { FindRegistrationByIdUseCase } from '@application/use-cases/find-registration-by-id';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentsController, CoursesController, RegistrationsController],
  providers: [
    CreateStudentUseCase,
    DeleteStudentUseCase,
    UpdateStudentUseCase,
    FindManyStudentsUseCase,
    FindStudentByIdUseCase,
    CreateCourseUseCase,
    DeleteCourseUseCase,
    UpdateCourseUseCase,
    FindManyCoursesUseCase,
    FindCourseByIdUseCase,
    CreateRegistrationUseCase,
    DeleteRegistrationUseCase,
    FindManyRegistrationUseCase,
    FindRegistrationByIdUseCase,
  ],
})
export class HttpModule {}
