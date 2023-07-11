import { Replace } from 'src/helpers/Replace';
import { randomUUID } from 'node:crypto';
import { Registration } from './Registration';

export interface StudentProps {
  name: string;
  courses?: Registration[] | undefined;
  createdAt: Date | string;
}

export class Student {
  private _id: string;
  private props: StudentProps;

  constructor(
    props: Replace<StudentProps, { createdAt?: Date }>,
    _id?: string,
  ) {
    this._id = _id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }
  public set name(name: string) {
    this.props.name = name;
  }
  public get name(): string {
    return this.props.name;
  }
  public set courses(courses: Registration[]) {
    this.props.courses = courses;
  }
  public get courses(): Registration[] | undefined {
    return this.props.courses;
  }
  public get createdAt(): Date | string {
    return this.props.createdAt;
  }
}
