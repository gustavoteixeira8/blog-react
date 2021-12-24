import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

export const validateFullName = (fullName) => {
  if (typeof fullName !== 'string') return false;

  const fullNameTrim = fullName.trim();
  const checkLength = fullNameTrim.length > 1 && fullNameTrim.length < 255;
  const mustHaveCharUpperAndLowerCase = /^[a-zá-ýA-ZÁ-Ý ]+$/.test(fullName);

  return checkLength && mustHaveCharUpperAndLowerCase;
};

export const validateEmail = (email) => {
  return isEmail(email);
};

export const validatePassword = (password) => {
  return isStrongPassword(password, {
    minLength: 8,
    minSymbols: 1,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  });
};

export const validateUsername = (username) => {
  if (typeof username !== 'string') return false;

  const nameTrim = username.trim();
  const checkLength = nameTrim.length > 1 && nameTrim.length < 255;
  const alphanumericAndNonAlphanumeric = /^[\w\W]+$/.test(username);
  const notExistsSpace = nameTrim.split(' ').length <= 1;

  return checkLength && alphanumericAndNonAlphanumeric && notExistsSpace;
};
