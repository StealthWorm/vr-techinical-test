import { Course } from './Course';

describe('Course', () => {
  it('should be able to create a course', () => {
    const course = new Course({
      program: 'Matemática',
      description: 'teste de decrição',
    });

    expect(course).toBeTruthy();
  });
});
