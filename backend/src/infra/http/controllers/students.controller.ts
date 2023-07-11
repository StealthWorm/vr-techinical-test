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
import { StudentWithCoursesExceptionFilter } from './errors/student-with-courses-error';
import { CreateStudentUseCase } from '@application/use-cases/create-student';
import { FindManyStudentsUseCase } from '@application/use-cases/find-many-students';
import { DeleteStudentUseCase } from '@application/use-cases/delete-student';
import { UpdateStudentUseCase } from '@application/use-cases/update-student';
import { CreateStudent } from '../dtos/create-student';
import { FindStudentByIdUseCase } from '@application/use-cases/find-student-by-id';

@Controller('students')
@UseFilters(ResourceNotFoundExceptionFilter, StudentWithCoursesExceptionFilter)
export class StudentsController {
  constructor(
    private createStudent: CreateStudentUseCase,
    private getStudents: FindManyStudentsUseCase,
    private deleteStudent: DeleteStudentUseCase,
    private updateStudent: UpdateStudentUseCase,
    private getStudentById: FindStudentByIdUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateStudent) {
    const { name } = body;

    const { student } = await this.createStudent.execute({
      name,
    });

    return {
      student,
    };
  }

  @Get()
  async getAll(@Query('query') query: string, @Query('page') page: number) {
    const { students } = await this.getStudents.execute({ query, page });

    return {
      students,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const { student } = await this.getStudentById.execute({ id });

    return {
      student,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateStudent) {
    const { name } = data;

    const { updated_student } = await this.updateStudent.execute({ id, name });

    return { updated_student };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteStudent.execute({ id });
  }
}
