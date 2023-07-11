import { Student } from './Student';

describe('Student', () => {
  it('should be able to create a student', () => {
    const student = new Student({
      name: 'John Doe',
    });

    expect(student).toBeTruthy();
  });
});
