export const setUserColorLocalStorage = (color) => {
  localStorage.setItem('USER_COLOR', color);
};

export const getUserColorLocalStorage = () => {
  return localStorage.getItem('USER_COLOR');
};

export const restoreUserColorLocalStorage = () => {
  setUserColorLocalStorage('#c3073f');
};
