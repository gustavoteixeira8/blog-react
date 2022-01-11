import { generateRandomString } from './generateRandomString';

export const getSecretKey = () => {
  const KEY_NAME = 'KEY_ENCRYPT';
  let key = sessionStorage.getItem(KEY_NAME);

  if (!key) {
    sessionStorage.setItem(KEY_NAME, generateRandomString());
    key = sessionStorage.getItem(KEY_NAME);
  }

  return key;
};
