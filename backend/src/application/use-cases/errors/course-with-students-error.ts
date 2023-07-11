export class CoursesWithStudents extends Error {
  constructor() {
    super('It is not possible to delete a course with students.');
  }
}
