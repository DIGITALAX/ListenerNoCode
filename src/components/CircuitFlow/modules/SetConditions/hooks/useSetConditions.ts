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
          actionImage: "QmQaUjMfMg1hmxyfHdAdeeT6hiw4JEbMkqKARexCytEMLu",
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
          actionImage: "QmUQVRH5iX5FhqDN3dpN5ZGGAguaUh7MbTN6p1U9B2tB3r",
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
          actionImage: "QmRyjnEuR6sKeejA92eRbUXFZg9G6BtXQRprwgLc9zNkNn",
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
          actionImage: "QmU7QLvyHbSoGTxkDGBgCXDh5rsr9BBHubSsZBoYPcSeDq",
        })
      );
    } else if (newEventArgs?.length < 1) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Event Args Missing. Try Again.",
          actionImage: "Qmeu1VLZewUTJ7NvyY3fn8Kmr8MReFGJYMmbxzNqqmYVUf",
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
          actionImage: "Qmcz8vhEfNK5dyryED1rp6p1LE6CBJLr9XRNxsyrbqrFoK",
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
          actionImage: "QmQM6CYN8fms9E4oJnzfUGUHdVawwFvVz9HY5vT32FmHz2",
        })
      );
    } else if (newExpectedValues?.length < 1) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Expected Values Missing. Try Again.",
          actionImage: "QmcqV3qmqJhzqmqEM6kRaPtgmyxMYnUfsRrkdbTDYxCsJw",
        })
      );
    } else if (expectedValues?.length !== eventArgs?.length) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage:
            "Each Event Arg Needs A Corresponding Expected Value. Try Again.",
          actionImage: "QmXiYwejG2YZrNuo7xAsAWAmmkqU2Wbzwj1URDkaP9FuMQ",
        })
      );
    } else if (newInputs?.length < 1) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Contract ABI Inputs Missing. Try Again.",
          actionImage: "QmRWHaMFya1MHuS7ysQesSDYjcqtdygq17aFk4PUdg7dVh",
        })
      );
    } else if (newOutputs?.length < 1) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Contract ABI Outputs Missing. Try Again.",
          actionImage: "QmWMQKSDzchgfe3KSVSLh98ArZT2k9r8tV772T2EMEH9E4",
        })
      );
    } else if (
      !Object.values(CHAIN_NAME)
        .map((enumValue) => enumValue.toLowerCase())
        .includes(newContractConditionInformation.chainId.toLowerCase())
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Chain Name Invalid. Try Again.",
          actionImage: "QmaLbRzzCP1axGEd6vJsDs7Jm7hyyiBGYsnBfv3jW51KiX",
        })
      );
    } else {
      const errorCheck = codeChecker(
        matchFunctionsContract.onError.toString(),
        false
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
            actionImage: "QmWZSgL8Y14FMTq4k2JPKv5mPwyg1LMMjfwPpPE1kjJoj7",
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
          actionImage: "QmTwJR5WigvzU2WcXsRRbqZY4Av6EfGokmUMz6n1pKL9BL",
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
          actionImage: "QmQspswKVpm8MTGfw7esAN6estvHtXhANycx9iUEYPmHsD",
        })
      );
    } else if (!checkBaseURL(newWebhookConditionInformation?.baseUrl)) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Base URL Invalid. Try Again.",
          actionImage: "Qmdont4GbQx4BhgdF1FWvhCow21rRTjst6wwESNNLxN5QJ",
        })
      );
    } else if (!checkEndpoint(newWebhookConditionInformation?.endpoint)) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Endpoint Invalid. Try Again.",
          actionImage: "QmWgZnGb5HLEAXZ9y5N7fxAFvoTvb5Bv6CbLaMdfCQSLbS",
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
          actionImage: "QmfM8CZg7C4T4338VL7gEb9VwhcFqYR3GKE75z472oaUiZ",
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
          actionImage: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
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
          actionImage: "Qmf3knH67VUqS2icK5hbkSUqRTxCFdbfdZnyxWPrJVG5w4",
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
          actionImage: "Qmez3hLGshhkVjobBpaCATxnMyLpBhBvDmRSEVGdAxJijE",
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
          actionImage: "QmUzzkGb1HKfixUnyKbVDHVb9TG9nYpdYQhL6uZckRETow",
        })
      );
    } else {
      const errorCheck = codeChecker(
        matchFunctionsWebhook.onError.toString(),
        false
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
            actionImage: "QmaYQxBhpB8DqkX6Z1swzDD6iUaWgPowz8428YNSK2XWK2",
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
          conditions: circuitInformation.conditions.map((obj) =>
            obj.id === newContractConditionInformation?.id
              ? {
                  ...obj,
                  ...({
                    ...newContractConditionInformation,
                    abi,
                    eventArgName: newEventArgs,
                    expectedValue: newExpectedValues,
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
      const { checker, newBaseURL, newEndpoint } = checkWebhookCondition();
      if (!checker) {
        return;
      }

      dispatch(
        setCircuitInformation({
          ...circuitInformation,
          conditions: circuitInformation.conditions.map((obj) =>
            obj.id === newWebhookConditionInformation?.id
              ? ({
                  ...obj,
                  ...{
                    ...newWebhookConditionInformation,
                    baseUrl: newBaseURL,
                    endpoint: newEndpoint
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
