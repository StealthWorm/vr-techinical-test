import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Query,
  Put,
  UseFilters,
} from '@nestjs/common';
import { ResourceNotFoundExceptionFilter } from './errors/resource-not-found-error';
import { CoursesWithStudentsExceptionFilter } from './errors/course-with-students-error';
import { CreateCourseUseCase } from '@application/use-cases/create-course';
import { FindManyCoursesUseCase } from '@application/use-cases/find-many-courses';
import { DeleteCourseUseCase } from '@application/use-cases/delete-course';
import { UpdateCourseUseCase } from '@application/use-cases/update-course';
import { CreateCourse } from '../dtos/create-course';
import { FindCourseByIdUseCase } from '@application/use-cases/find-course-by-id';

@Controller('courses')
@UseFilters(ResourceNotFoundExceptionFilter, CoursesWithStudentsExceptionFilter)
export class CoursesController {
  constructor(
    private createCourse: CreateCourseUseCase,
    private getCourses: FindManyCoursesUseCase,
    private deleteCourse: DeleteCourseUseCase,
    private updateCourse: UpdateCourseUseCase,
    private getCourseById: FindCourseByIdUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateCourse) {
    const { description, program } = body;

    const { course } = await this.createCourse.execute({
      description,
      program,
    });

    return {
      course,
    };
  }

  @Get()
  async getAll(@Query('query') query: string, @Query('page') page: number) {
    const { courses } = await this.getCourses.execute({ query, page });

    return {
      courses,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const { course } = await this.getCourseById.execute({ id });

    return {
      course,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateCourse) {
    const { description, program } = data;

    const { updated_course } = await this.updateCourse.execute({
      id,
      description,
      program,
    });

    return {
      updated_course,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteCourse.execute({ id });
  }
}
