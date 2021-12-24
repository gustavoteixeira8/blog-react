import {
  validateEmail,
  validateFullName,
  validatePassword,
  validateUsername,
} from '../validations';

export class User {
  constructor(userData) {
    this.fullName = userData.fullName;
    this.email = userData.email;
    this.username = userData.username;
    this.password = userData.password;
  }

  static create(userData) {
    const isValidEmail = validateEmail(userData.email);
    const isValidPassword = validatePassword(userData.password);
    const isValidFullName = validateFullName(userData.fullName);
    const isValidUsername = validateUsername(userData.username);
    const errors = [];

    if (!isValidFullName) {
      errors.push('Name must be between 2 and 255 characters');
    }

    if (!isValidEmail) {
      errors.push('Invalid email');
    }

    if (!isValidUsername) {
      errors.push('Username must be between 2 and 255 characters with no spaces');
    }

    if (!isValidPassword) {
      errors.push(
        'Password must have at least 8 characters between uppercase, lowercase, symbols and numbers',
      );
    }

    if (errors.length) return errors;

    return new User(userData);
  }
}
