import { ContractCondition } from "@/components/CircuitFlow/types/litlistener.types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import { RootState } from "../../../../../../redux/store";

const useSetConditions = () => {
  const dispatch = useDispatch();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const [conditionType, setConditionType] = useState<string>("contract");
  const [newContractConditionInformation, setNewContractConditionInformation] =
    useState<ContractCondition | undefined>();
  const [builtABI, setBuiltABI] = useState<any[]>([]);

  const buildABI = (
    functionName: string,
    inputs: {
      indexed: boolean;
      internalType: string;
      name: string;
      type: string;
    }[],
    outputs: {
      indexed: boolean;
      internalType: string;
      name: string;
      type: string;
    }[] = []
  ) => {
    const abi = {
      anonymous: false,
      inputs: [],
      outputs: [],
    } as any;

    for (const input of inputs) {
      const { indexed, internalType, name, type } = input;
      const inputObj = {
        indexed: indexed || false,
        internalType: internalType || "string",
        name: name || "",
        type: type || "string",
      };

      abi.inputs.push(inputObj);
    }

    for (const output of outputs) {
      const { internalType, name, type } = output;
      const outputObj = {
        internalType: internalType || "string",
        name: name || "",
        type: type || "string",
      };

      abi.outputs.push(outputObj);
    }

    if (functionName) {
      abi.name = functionName;
    }

    setNewContractConditionInformation({
      ...newContractConditionInformation,
      abi,
    });
  };

  const handleAddConditionAddReset = () => {
    dispatch(
      setCircuitInformation({
        ...circuitInformation!,
        conditions: [
          ...circuitInformation!.conditions,
          ...(newContractConditionInformation
            ? [newContractConditionInformation]
            : []),
        ],
      })
    );
  };

  return {
    conditionType,
    setConditionType,
    newContractConditionInformation,
    setNewContractConditionInformation,
  };
};

export default useSetConditions;
