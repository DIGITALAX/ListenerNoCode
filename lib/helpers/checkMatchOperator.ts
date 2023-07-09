export const checkMatchOperator = (str: string) => {
  const comparisonOperators = ["<", ">", "==", "===", "!==", "!=", ">=", "<="];

  return comparisonOperators.includes(str);
};
