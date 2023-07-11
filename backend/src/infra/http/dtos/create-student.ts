import { IsNotEmpty, Length } from 'class-validator';

export class CreateStudent {
  @IsNotEmpty({ message: 'Student name should not be empty!' })
  @Length(3, 50)
  name: string;
}
