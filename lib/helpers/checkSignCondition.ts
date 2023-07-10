export const checkSignCondition = (
  objectArray: {
    type: string;
    operator: string;
    value: boolean | number | string;
    valueType: boolean | number | string;
  }[]
) => {
  const validOperators = ["<", ">", "==", "===", "!==", "!=", ">=", "<="];
  const validValueTypes = ["boolean", "number", "string"];

  for (let i = 0; i < objectArray.length; i++) {
    const obj = objectArray[i];

    if (
      obj.type === undefined ||
      obj.operator === undefined ||
      obj.value === undefined ||
      obj.valueType === undefined
    ) {
      return { isValid: false, updatedArray: null };
    }

    if (obj.type !== "&&" && obj.type !== "||") {
      return { isValid: false, updatedArray: null };
    }

    if (!validOperators.includes(obj.operator)) {
      return { isValid: false, updatedArray: null };
    }

    if (
      !validValueTypes.includes(
        obj.valueType as "boolean" | "number" | "string"
      )
    ) {
      return { isValid: false, updatedArray: null };
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
        return { isValid: false, updatedArray: null };
      }
    } else if (obj.valueType === "number") {
      if (typeof obj.value === "number") {
        convertedValue = obj.value;
      } else if (typeof obj.value === "string") {
        const parsedValue = parseFloat(obj.value);
        if (!isNaN(parsedValue)) {
          convertedValue = parsedValue;
        } else {
          return { isValid: false, updatedArray: null };
        }
      } else {
        return { isValid: false, updatedArray: null };
      }
    } else {
      if (typeof obj.value === "string") {
        convertedValue = obj.value;
      } else {
        return { isValid: false, updatedArray: null };
      }
    }

    objectArray[i].value = convertedValue;
  }

  return { isValid: true, updatedSignConditions: objectArray };
};
