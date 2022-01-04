import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

export const validateFullName = (fullName) => {
  if (typeof fullName !== 'string') fullName = '';

  const fullNameTrim = fullName.trim();
  const checkLength = fullNameTrim.length > 1 && fullNameTrim.length < 255;
  const mustHaveCharUpperAndLowerCase = /^[a-zá-ýA-ZÁ-Ý ]+$/.test(fullName);
  const isValid = checkLength && mustHaveCharUpperAndLowerCase;

  return {
    isValid,
    message: !isValid ? 'Name must be between 2 and 255 characters' : null,
  };
};

export const validateEmail = (email) => {
  const isValid = isEmail(email);
  return {
    isValid,
    message: !isValid ? 'Invalid email' : null,
  };
};

export const validatePassword = (password) => {
  const isValid = isStrongPassword(password, {
    minLength: 8,
    minSymbols: 1,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  });

  return {
    isValid,
    message: !isValid
      ? 'Password must have at least 8 characters between uppercase, lowercase, symbols and numbers'
      : null,
  };
};

export const validateUsername = (username) => {
  if (typeof username !== 'string') {
    username = '';
  }

  const nameTrim = username.trim();
  const checkLength = nameTrim.length > 1 && nameTrim.length < 255;
  const alphanumericAndNonAlphanumeric = /^[\w\W]+$/.test(username);
  const notExistsSpace = nameTrim.split(' ').length <= 1;
  const isValid = checkLength && alphanumericAndNonAlphanumeric && notExistsSpace;

  return {
    isValid,
    message: !isValid ? 'Username must be between 2 and 255 characters with no spaces' : null,
  };
};

export const validateCategoryName = (name) => {
  if (typeof name !== 'string') {
    name = '';
  }

  const nameTrim = name.trim();
  const checkLength = nameTrim.length >= 3 && nameTrim.length < 255;
  const alphanumericAndNonAlphanumeric = /^[\w\W]+$/.test(name);
  const isValid = checkLength && alphanumericAndNonAlphanumeric;

  return {
    isValid,
    message: !isValid ? 'Category name must be between 3 and 255 characters' : null,
  };
};

export const validateArticleText = (text) => {
  if (typeof text !== 'string') text = '';

  const isValid = text.length >= 100 && text.length <= 30_000;

  return {
    isValid,
    message: !isValid ? 'Article text must be between 100 and 30000 characters' : null,
  };
};

export const validateArticleTitle = (title) => {
  if (typeof title !== 'string') title = '';

  const nameTrim = title.trim();
  const checkLength = nameTrim.length >= 5 && nameTrim.length < 255;
  const alphanumericAndNonAlphanumeric = /^[\w\W]+$/.test(title);

  const isValid = checkLength && alphanumericAndNonAlphanumeric;

  return {
    isValid,
    message: !isValid ? 'Title must be between 5 and 255 characters' : null,
  };
};

export const validateImageExtension = (image) => {
  if (typeof image !== 'string') image = '';

  const [, imageType] = image.split('.');
  const allowedTypes = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp'];

  const isValid = allowedTypes.includes(imageType);

  return {
    isValid,
    message: !isValid ? 'Image name must be in jpeg, png, gif, bmp and webp' : null,
  };
};

export const validateNumberOfCategories = (categories) => {
  if (!Array.isArray(categories)) categories = [];

  let isValid = true;

  if (categories.length <= 0 || categories.length > 5) isValid = false;

  return {
    isValid,
    message: !isValid ? 'Maximum of different categories are 5' : null,
  };
};
