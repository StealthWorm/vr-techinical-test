import { Replace } from 'src/helpers/Replace';
import { randomUUID } from 'node:crypto';

export interface RegistrationProps {
  codStudent: string;
  codCourse: string;
  createdAt: Date | string;
}

export class Registration {
  private _id: string;
  private props: RegistrationProps;

  constructor(
    props: Replace<RegistrationProps, { createdAt?: Date }>,
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
  public set codCourse(codCourse: string) {
    this.props.codCourse = codCourse;
  }
  public get codCourse(): string {
    return this.props.codCourse;
  }
  public set codStudent(codStudent: string) {
    this.props.codStudent = codStudent;
  }
  public get codStudent(): string {
    return this.props.codStudent;
  }
  public get createdAt(): Date | string {
    return this.props.createdAt;
  }
}
