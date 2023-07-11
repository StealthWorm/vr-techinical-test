import { IsNotEmpty } from 'class-validator';

export class CreateRegistration {
  @IsNotEmpty({ message: 'Course should not be empty!' })
  codCourse: string;

  @IsNotEmpty({ message: 'Student should not be empty!' })
  codStudent: string;
}
