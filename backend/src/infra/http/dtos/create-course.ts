import { IsNotEmpty, Length } from 'class-validator';

export class CreateCourse {
  @IsNotEmpty({ message: 'Course description should not be empty!' })
  @Length(3, 50)
  description: string;

  @IsNotEmpty({ message: 'Program description should not be empty!' })
  @Length(10, 100)
  program: string;
}
