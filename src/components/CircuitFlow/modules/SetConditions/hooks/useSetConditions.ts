import {
  ContractCondition,
  WebhookCondition,
} from "@/components/CircuitFlow/types/litlistener.types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import { RootState } from "../../../../../../redux/store";

const useSetConditions = () => {
  const dispatch = useDispatch();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const [conditionType, setConditionType] = useState<string>("contract");
  const [editingState, setEditingState] = useState<boolean>(false);
  const [newContractConditionInformation, setNewContractConditionInformation] =
    useState<ContractCondition | undefined>();
  const [newWebhookConditionInformation, setNewWebhookConditionInformation] =
    useState<WebhookCondition | undefined>();
  const [eventArgs, setEventArgs] = useState<string[]>([""]);
  const [expectedValues, setExpectedValues] = useState<any[]>([""]);
  const [matchFunctions, setMatchFunctions] = useState<{
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  }>({
    onMatched: async () => {},
    onUnMatched: async () => {},
    onError: () => {},
  });
  const [dropDownsOpenContract, setDropDownsOpenContract] = useState<{
    internalTypesInput: boolean[];
    typesInput: boolean[];
    indexed: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
  }>({
    internalTypesInput: [false],
    typesInput: [false],
    indexed: [false],
    internalTypesOutput: [false],
    typesOutput: [false],
  });
  const [inputs, setInputs] = useState<
    {
      indexed: boolean;
      internalType: string;
      name: string;
      type: string;
    }[]
  >([
    {
      indexed: true,
      internalType: "string",
      name: "",
      type: "string",
    },
  ]);
  const [outputs, setOutputs] = useState<
    {
      internalType: string;
      name: string;
      type: string;
    }[]
  >([
    {
      internalType: "",
      name: "",
      type: "",
    },
  ]);

  const buildABI = (
    functionName: string,
    inputs: {
      indexed: boolean;
      internalType: string;
      name: string;
      type: string;
    }[],
    outputs: {
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

    abi.name = functionName;
    abi.type = "event";

    return abi;
  };

  const handleAddConditionAndReset = () => {
    if (conditionType === "contract") {
      const abi = buildABI(
        newContractConditionInformation?.eventName!,
        inputs,
        outputs
      );

      dispatch(
        setCircuitInformation({
          ...circuitInformation,
          conditions: [
            ...circuitInformation.conditions,
            {
              ...newContractConditionInformation,
              id:
                circuitInformation.conditions?.length > 0
                  ? circuitInformation.conditions?.length?.toString()
                  : "1",
              abi,
              eventArgName: eventArgs,
              expectedValue: expectedValues,
              onMatched: matchFunctions.onMatched,
              onUnMatched: matchFunctions.onUnMatched,
              onError: matchFunctions.onError,
            } as ContractCondition,
          ],
        })
      );
      setNewContractConditionInformation(undefined);
      setInputs([
        {
          indexed: true,
          internalType: "string",
          name: "",
          type: "string",
        },
      ]);
      setOutputs([
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ]);
      setMatchFunctions({
        onMatched: async () => {},
        onUnMatched: async () => {},
        onError: () => {},
      })
      setEventArgs([""]);
      setExpectedValues([""]);
      setDropDownsOpenContract({
        internalTypesInput: [false],
        typesInput: [false],
        indexed: [false],
        internalTypesOutput: [false],
        typesOutput: [false],
      });
    } else {
      setNewWebhookConditionInformation(undefined);
    }
  };

  const handleUpdateCondition = () => {
    if (conditionType === "contract") {
      const abi = buildABI(
        newContractConditionInformation?.eventName!,
        inputs,
        outputs
      );

      console.log({ newContractConditionInformation });

      dispatch(
        setCircuitInformation({
          ...circuitInformation,
          conditions: circuitInformation.conditions.map((obj) =>
            obj.id === newContractConditionInformation?.id
              ? {
                  ...obj,
                  ...({
                    ...newContractConditionInformation,
                    abi,
                    eventArgName: eventArgs,
                    expectedValue: expectedValues,
                    onMatched: matchFunctions.onMatched,
                    onUnMatched: matchFunctions.onUnMatched,
                    onError: matchFunctions.onError,
                  } as ContractCondition),
                }
              : obj
          ),
        })
      );

      setNewContractConditionInformation(undefined);
      setInputs([
        {
          indexed: true,
          internalType: "string",
          name: "",
          type: "string",
        },
      ]);
      setOutputs([
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ]);
      setMatchFunctions({
        onMatched: async () => {},
        onUnMatched: async () => {},
        onError: () => {},
      })
      setEventArgs([""]);
      setExpectedValues([""]);
      setDropDownsOpenContract({
        internalTypesInput: [false],
        typesInput: [false],
        indexed: [false],
        internalTypesOutput: [false],
        typesOutput: [false],
      });
    } else {
      setNewWebhookConditionInformation(undefined);
    }

    setEditingState(false);
  };

  useEffect(() => {
    if (expectedValues) {
      if (expectedValues.length < eventArgs.length) {
        setExpectedValues((prevExpectedValues) => [
          ...prevExpectedValues,
          ...new Array(eventArgs.length - prevExpectedValues.length),
        ]);
      } else if (expectedValues.length > eventArgs.length) {
        setExpectedValues((prevExpectedValues) =>
          prevExpectedValues.slice(0, eventArgs.length)
        );
      }
    }
  }, [eventArgs]);

  return {
    conditionType,
    setConditionType,
    newContractConditionInformation,
    setNewContractConditionInformation,
    outputs,
    setOutputs,
    inputs,
    setInputs,
    handleAddConditionAndReset,
    dropDownsOpenContract,
    setDropDownsOpenContract,
    eventArgs,
    setEventArgs,
    expectedValues,
    setExpectedValues,
    matchFunctions,
    setMatchFunctions,
    newWebhookConditionInformation,
    setNewWebhookConditionInformation,
    editingState,
    setEditingState,
    handleUpdateCondition,
  };
};

export default useSetConditions;
