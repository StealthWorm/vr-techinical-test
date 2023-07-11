import { Replace } from 'src/helpers/Replace';
import { randomUUID } from 'node:crypto';
import { Registration } from './Registration';

export interface CourseProps {
  description: string;
  program: string;
  students?: Registration[] | undefined;
  createdAt: Date | string;
}

export class Course {
  private _id: string;
  private props: CourseProps;

  constructor(props: Replace<CourseProps, { createdAt?: Date }>, _id?: string) {
    this._id = _id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }
  public set description(description: string) {
    this.props.description = description;
  }
  public get description(): string {
    return this.props.description;
  }
  public set program(program: string) {
    this.props.program = program;
  }
  public get program(): string {
    return this.props.program;
  }
  public set students(students: Registration[]) {
    this.props.students = students;
  }
  public get students(): Registration[] | undefined {
    return this.props.students;
  }
  public get createdAt(): Date | string {
    return this.props.createdAt;
  }
}
