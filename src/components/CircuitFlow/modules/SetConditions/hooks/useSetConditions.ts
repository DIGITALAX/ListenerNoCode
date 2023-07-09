import {
  CHAIN_NAME,
  ContractCondition,
  WebhookCondition,
} from "@/components/CircuitFlow/types/litlistener.types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import { RootState } from "../../../../../../redux/store";
import { setModalOpen } from "../../../../../../redux/reducers/modalOpenSlice";
import { codeChecker } from "../../../../../../lib/helpers/codeChecker";
import { checkMatchOperator } from "../../../../../../lib/helpers/checkMatchOperator";
import { checkResponsePath } from "../../../../../../lib/helpers/checkResponsePath";
import { checkBaseURL } from "../../../../../../lib/helpers/checkBaseURL";
import { checkEndpoint } from "../../../../../../lib/helpers/checkEndpoint";
import { setNewContractConditionInformation } from "../../../../../../redux/reducers/newContractConditionInformationSlice";
import { setNewWebhookConditionInformation } from "../../../../../../redux/reducers/newWebhookConditionInformationSlice";

const useSetConditions = () => {
  const dispatch = useDispatch();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const newContractConditionInformation = useSelector(
    (state: RootState) => state.app.newContractConditionInformationReducer.value
  );
  const newWebhookConditionInformation = useSelector(
    (state: RootState) => state.app.newWebhookConditionInformationReducer.value
  );
  const [conditionType, setConditionType] = useState<string>("contract");
  const [editingState, setEditingState] = useState<boolean>(false);
  const [eventArgs, setEventArgs] = useState<string[]>([""]);
  const [expectedValues, setExpectedValues] = useState<any[]>([""]);
  const [matchFunctionsContract, setMatchFunctionsContract] = useState<{
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  }>({
    onMatched: async () => {},
    onUnMatched: async () => {},
    onError: () => {},
  });
  const [matchFunctionsWebhook, setMatchFunctionsWebhook] = useState<{
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
      internalType: "string",
      name: "",
      type: "string",
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

  const checkContractCondition = (): {
    checker: boolean;
    newInputs: {
      indexed: boolean;
      internalType: string;
      name: string;
      type: string;
    }[];
    newOutputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    newExpectedValues: string[];
    newEventArgs: string[];
  } => {
    let checker = true;
    const newInputs = inputs.filter((obj) =>
      Object.values(obj).every(
        (value) => typeof value !== "string" || value.trim() !== ""
      )
    );
    const newOutputs = outputs.filter((obj) =>
      Object.values(obj).every(
        (value) => typeof value !== "string" || value.trim() !== ""
      )
    );
    const newEventArgs = eventArgs.filter((value) => value?.trim() !== "");
    const newExpectedValues = expectedValues.filter(
      (value) => value?.trim() !== ""
    );

    if (
      !newContractConditionInformation?.contractAddress ||
      newContractConditionInformation?.contractAddress?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Contract Address Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      !newContractConditionInformation?.contractAddress.startsWith("0x")
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Contract Address Invalid. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      !newContractConditionInformation?.eventName ||
      newContractConditionInformation?.eventName?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Event Name Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      !newContractConditionInformation?.chainId ||
      newContractConditionInformation?.chainId?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Chain Id Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (newEventArgs?.length < 1) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Event Args Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      !newContractConditionInformation?.matchOperator ||
      newContractConditionInformation?.matchOperator?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Match Operator Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      !checkMatchOperator(newContractConditionInformation?.matchOperator)
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Invalid Match Operator. Try Again.",
          actionImage: "",
        })
      );
    } else if (newExpectedValues?.length < 1) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Expected Values Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (expectedValues?.length !== eventArgs?.length) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage:
            "Each Event Arg Needs A Corresponding Expected Value. Try Again.",
          actionImage: "",
        })
      );
    } else if (newInputs?.length < 1) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Contract ABI Inputs Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (newOutputs?.length < 1) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Contract ABI Outputs Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      Object.values(CHAIN_NAME).includes(
        newContractConditionInformation.chainId
      )
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Chain Name Invalid. Try Again.",
          actionImage: "",
        })
      );
    } else {
      const errorCheck = codeChecker(
        matchFunctionsContract.onError.toString(),
        true
      );
      const matchCheck = codeChecker(
        matchFunctionsContract.onMatched.toString(),
        true
      );
      const unMatchCheck = codeChecker(
        matchFunctionsContract.onUnMatched.toString(),
        true
      );

      const errorEmpty = matchFunctionsContract.onError.toString()?.trim();
      const matchEmpty = matchFunctionsContract.onError.toString()?.trim();
      const unMatchEmpty = matchFunctionsContract.onError.toString()?.trim();

      if (
        (!errorCheck && errorEmpty !== "") ||
        (!matchCheck && matchEmpty !== "") ||
        (!unMatchCheck && unMatchEmpty !== "")
      ) {
        checker = false;
        dispatch(
          setModalOpen({
            actionOpen: true,
            actionMessage:
              "Match, Error & UnMatch Functions Invalid. Try Again.",
            actionImage: "",
          })
        );
      }
    }

    return { checker, newInputs, newOutputs, newExpectedValues, newEventArgs };
  };

  const checkWebhookCondition = (): {
    checker: boolean;
    newBaseURL: string;
    newEndpoint: string;
  } => {
    let checker = true;
    const newBaseURL = !newWebhookConditionInformation?.baseUrl.endsWith("/")
      ? newWebhookConditionInformation?.baseUrl + "/"
      : newWebhookConditionInformation?.baseUrl;
    const newEndpoint = newWebhookConditionInformation?.endpoint.startsWith("/")
      ? newWebhookConditionInformation?.endpoint.substring(1)
      : newWebhookConditionInformation?.endpoint!;
    if (
      !newWebhookConditionInformation?.baseUrl ||
      newWebhookConditionInformation?.baseUrl?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Base URL Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      !newWebhookConditionInformation?.endpoint ||
      newWebhookConditionInformation?.endpoint?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Endpoint Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (!checkBaseURL(newWebhookConditionInformation?.baseUrl)) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Base URL Invalid. Try Again.",
          actionImage: "",
        })
      );
    } else if (!checkEndpoint(newWebhookConditionInformation?.endpoint)) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Endpoint Invalid. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      !newWebhookConditionInformation?.matchOperator ||
      newWebhookConditionInformation?.matchOperator?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Match Operator Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      !checkMatchOperator(newWebhookConditionInformation?.matchOperator)
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Invalid Match Operator. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      !newWebhookConditionInformation?.responsePath ||
      newWebhookConditionInformation?.responsePath?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Response Path Missing. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      !checkResponsePath(newWebhookConditionInformation.responsePath)
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Response Path Invalid. Try Again.",
          actionImage: "",
        })
      );
    } else if (
      !newWebhookConditionInformation?.expectedValue ||
      newWebhookConditionInformation?.expectedValue?.toString()?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Expected Value Missing. Try Again.",
          actionImage: "",
        })
      );
    } else {
      const errorCheck = codeChecker(
        matchFunctionsWebhook.onError.toString(),
        true
      );
      const matchCheck = codeChecker(
        matchFunctionsWebhook.onMatched.toString(),
        true
      );
      const unMatchCheck = codeChecker(
        matchFunctionsWebhook.onUnMatched.toString(),
        true
      );

      const errorEmpty = matchFunctionsWebhook.onError.toString()?.trim();
      const matchEmpty = matchFunctionsWebhook.onError.toString()?.trim();
      const unMatchEmpty = matchFunctionsWebhook.onError.toString()?.trim();

      if (
        (!errorCheck && errorEmpty !== "") ||
        (!matchCheck && matchEmpty !== "") ||
        (!unMatchCheck && unMatchEmpty !== "")
      ) {
        checker = false;
        dispatch(
          setModalOpen({
            actionOpen: true,
            actionMessage:
              "Match, Error & UnMatch Functions Invalid. Try Again.",
            actionImage: "",
          })
        );
      }
    }

    return { checker, newBaseURL, newEndpoint };
  };

  const handleAddConditionAndReset = () => {
    if (conditionType === "contract") {
      const {
        checker,
        newInputs,
        newOutputs,
        newEventArgs,
        newExpectedValues,
      } = checkContractCondition();
      if (!checker) {
        return;
      }

      const abi = buildABI(
        newContractConditionInformation?.eventName!,
        newInputs,
        newOutputs
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
              eventArgName: newEventArgs,
              expectedValue: newExpectedValues,
              onMatched: matchFunctionsContract.onMatched,
              onUnMatched: matchFunctionsContract.onUnMatched,
              onError: matchFunctionsContract.onError,
            } as ContractCondition,
          ],
        })
      );
      dispatch(setNewContractConditionInformation(undefined));
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
      setMatchFunctionsContract({
        onMatched: async () => {},
        onUnMatched: async () => {},
        onError: () => {},
      });
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
      const { checker, newBaseURL, newEndpoint } = checkWebhookCondition();
      if (!checker) {
        return;
      }
      dispatch(
        setCircuitInformation({
          ...circuitInformation,
          conditions: [
            ...circuitInformation.conditions,
            {
              ...newWebhookConditionInformation,
              id:
                circuitInformation.conditions?.length > 0
                  ? circuitInformation.conditions?.length?.toString()
                  : "1",
              baseUrl: newBaseURL,
              endpoint: newEndpoint,
            } as WebhookCondition,
          ],
        })
      );

      dispatch(setNewWebhookConditionInformation(undefined));
      setMatchFunctionsWebhook({
        onMatched: async () => {},
        onUnMatched: async () => {},
        onError: () => {},
      });
    }
  };

  const handleUpdateCondition = () => {
    if (conditionType === "contract") {
      const abi = buildABI(
        newContractConditionInformation?.eventName!,
        inputs,
        outputs
      );

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
                    onMatched: matchFunctionsContract.onMatched,
                    onUnMatched: matchFunctionsContract.onUnMatched,
                    onError: matchFunctionsContract.onError,
                  } as ContractCondition),
                }
              : obj
          ),
        })
      );

      dispatch(setNewContractConditionInformation(undefined));
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
      setMatchFunctionsContract({
        onMatched: async () => {},
        onUnMatched: async () => {},
        onError: () => {},
      });
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
      dispatch(
        setCircuitInformation({
          ...circuitInformation,
          conditions: circuitInformation.conditions.map((obj) =>
            obj.id === newWebhookConditionInformation?.id
              ? ({
                  ...obj,
                  ...{
                    ...newWebhookConditionInformation,
                  },
                } as WebhookCondition)
              : obj
          ),
        })
      );

      dispatch(setNewWebhookConditionInformation(undefined));
      setMatchFunctionsWebhook({
        onMatched: async () => {},
        onUnMatched: async () => {},
        onError: () => {},
      });
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
    matchFunctionsContract,
    setMatchFunctionsContract,
    editingState,
    setEditingState,
    handleUpdateCondition,
    matchFunctionsWebhook,
    setMatchFunctionsWebhook,
  };
};

export default useSetConditions;
