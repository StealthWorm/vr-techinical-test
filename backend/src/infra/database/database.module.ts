import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { StudentsRepository } from '@application/repositories/students-repository';
import { PrismaStudentRepository } from './prisma/repositories/prisma-students-repository';
import { CoursesRepository } from '@application/repositories/courses-repository';
import { PrismaCoursesRepository } from './prisma/repositories/prisma-courses-repository';
import { RegistrationsRepository } from '@application/repositories/registration-repository';
import { PrismaRegistrationsRepository } from './prisma/repositories/prisma-registrations-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: StudentsRepository,
      useClass: PrismaStudentRepository,
    },
    {
      provide: CoursesRepository,
      useClass: PrismaCoursesRepository,
    },

    {
      provide: RegistrationsRepository,
      useClass: PrismaRegistrationsRepository,
    },
  ],
  exports: [StudentsRepository, CoursesRepository, RegistrationsRepository],
})
export class DatabaseModule {}
