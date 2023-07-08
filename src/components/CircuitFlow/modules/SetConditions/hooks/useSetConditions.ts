import { Condition } from "@/components/CircuitFlow/types/litlistener.types";
import { useState } from "react";

const useSetConditions = () => {
  const [conditionType, setConditionType] = useState<string>("contract");
  const [newConditionInformation, setNewConditionInformation] =
    useState<Condition>();

  return {
    conditionType,
    setConditionType,
    newConditionInformation,
    setNewConditionInformation,
  };
};

export default useSetConditions;
