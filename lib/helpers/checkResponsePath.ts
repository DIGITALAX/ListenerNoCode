export const checkResponsePath = (str: string) => {
  const pattern = /^(\w+\.)*\w+$/;
  return pattern.test(str);
};
