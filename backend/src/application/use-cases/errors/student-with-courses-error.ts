export class StudentWithCourses extends Error {
  constructor() {
    super('It is not possible to delete a student enrolled in a course.');
  }
}
