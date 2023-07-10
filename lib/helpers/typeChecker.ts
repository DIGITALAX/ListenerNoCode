export const typeChecker = (
  objectArray: {
    internalType: string;
    name: string;
    type: string;
  }[],
  functionArgs: string[]
): {
  isValid: boolean;
  convertedArgs: any[];
} => {
  if (objectArray.length !== functionArgs.length) {
    return { isValid: false, convertedArgs: [] };
  }

  const convertedArgs: any[] = [];

  for (let i = 0; i < objectArray.length; i++) {
    const internalType = objectArray[i].internalType;
    let arg: any = functionArgs[i];

    if (internalType === "uint256" || internalType === "int256") {
      if (typeof arg !== "number") {
        arg = Number(arg);
        if (isNaN(arg)) {
          return { isValid: false, convertedArgs: [] };
        }
      }
    } else if (
      internalType === "address" ||
      internalType === "string" ||
      internalType === "bytes" ||
      internalType === "bytes32"
    ) {
      if (typeof arg !== "string") {
        arg = String(arg);
        return { isValid: false, convertedArgs: [] };
      }
    } else if (internalType === "bool") {
      if (typeof arg !== "boolean") {
        arg = Boolean(arg);
        return { isValid: false, convertedArgs: [] };
      }
    } else {
      return { isValid: false, convertedArgs: [] };
    }

    convertedArgs.push(arg);
  }

  return { isValid: true, convertedArgs };
};
