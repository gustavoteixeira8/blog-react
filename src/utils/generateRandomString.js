export const generateRandomString = () => {
  let firstStr = '';
  let secondStr = '';

  for (let i = 0; i <= 8; i++) {
    firstStr += Math.floor(Math.random() * 1_000_000).toString(36);
    secondStr += Math.floor(Math.random() * 1_000_000).toString(36);
  }

  return `${secondStr}${firstStr}`;
};
