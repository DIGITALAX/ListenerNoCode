export const checkSignCondition = (
  objectArray: {
    type: string;
    operator: string;
    value: boolean | number | string;
    valueType: boolean | number | string;
  }[]
): {
  isValid: boolean;
  updatedSignConditions: {
    type: string;
    operator: string;
    value: boolean | number | string;
  }[];
} => {
  const validOperators = ["<", ">", "==", "===", "!==", "!=", ">=", "<="];
  const validValueTypes = ["boolean", "number", "string"];

  let invalidObjects = false;

  const updatedArray = objectArray.filter((obj) => {
    if (
      obj.type === undefined ||
      obj.operator === undefined ||
      obj.valueType === undefined ||
      (obj.type !== "&&" && obj.type !== "||") ||
      !validOperators.includes(obj.operator) ||
      !validValueTypes.includes(
        obj.valueType as "boolean" | "number" | "string"
      )
    ) {
      invalidObjects = true;
      return false;
    }

    if (obj.value === undefined) {
      return false;
    }

    let convertedValue: boolean | number | string;
    if (obj.valueType === "boolean") {
      if (typeof obj.value === "boolean") {
        convertedValue = obj.value;
      } else if (
        typeof obj.value === "string" &&
        (obj.value === "true" || obj.value === "false")
      ) {
        convertedValue = obj.value === "true";
      } else {
        invalidObjects = true;
        return false;
      }
    } else if (obj.valueType === "number") {
      if (typeof obj.value === "number") {
        convertedValue = obj.value;
      } else if (typeof obj.value === "string") {
        const parsedValue = parseFloat(obj.value);
        if (!isNaN(parsedValue)) {
          convertedValue = parsedValue;
        } else {
          invalidObjects = true;
          return false;
        }
      } else {
        invalidObjects = true;
        return false;
      }
    } else {
      if (typeof obj.value === "string") {
        convertedValue = obj.value;
      } else {
        invalidObjects = true;
        return false;
      }
    }

    obj.value = convertedValue;
    return true;
  });

  const filteredArray = updatedArray
    ? updatedArray?.map(({ valueType, ...rest }) => rest)
    : [];

  return { isValid: !invalidObjects, updatedSignConditions: filteredArray };
};
