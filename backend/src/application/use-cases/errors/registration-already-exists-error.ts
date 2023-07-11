export class RegistrationAlreadyExists extends Error {
  constructor() {
    super('A Registration to this student into that course already exists.');
  }
}
