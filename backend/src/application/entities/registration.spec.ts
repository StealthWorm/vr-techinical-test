import { Registration } from './Registration';

describe('Student', () => {
  it('should be able to create a registration', () => {
    const registration = new Registration({
      codCourse: 'c7735353-4088-4165-bcd1-855b2b854270',
      codStudent: '00880d75-a933-4fef-94ab-e05744435297',
    });

    expect(registration).toBeTruthy();
  });
});
