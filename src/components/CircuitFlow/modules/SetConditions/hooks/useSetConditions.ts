import {
  ContractCondition,
  WebhookCondition,
} from "@/components/CircuitFlow/types/litlistener.types";
import { useContext, useEffect, useState } from "react";
import { checkMatchOperator } from "../../../../../../lib/helpers/checkMatchOperator";
import { checkResponsePath } from "../../../../../../lib/helpers/checkResponsePath";
import { checkBaseURL } from "../../../../../../lib/helpers/checkBaseURL";
import { checkEndpoint } from "../../../../../../lib/helpers/checkEndpoint";
import { SET_CONDITIONS_TEXT_WEBHOOK } from "../../../../../../lib/constants";
import { ModalContext } from "@/pages/_app";

const useSetConditions = () => {
  const context = useContext(ModalContext);
  const [dropDownChainContract, setDropDownChainContract] =
    useState<boolean>(false);
  const [text, setText] = useState<string>(SET_CONDITIONS_TEXT_WEBHOOK[0]);
  const [overviewOpen, setOverviewOpen] = useState<boolean>(true);
  const [conditionType, setConditionType] = useState<string>("web");
  const [editingState, setEditingState] = useState<boolean>(false);
  const [eventArgs, setEventArgs] = useState<string[]>([""]);
  const [expectedValues, setExpectedValues] = useState<any[]>([""]);
  const [apiPassword, setApiPassword] = useState<boolean>(false);
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

  const buildABI = (
    functionName: string,
    inputs: {
      indexed: boolean;
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => {
    const abi = {
      anonymous: false,
      inputs: [],
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
    newExpectedValues: string[];
    newEventArgs: string[];
  } => {
    let checker = true;

    const newEventArgs = eventArgs.filter((value) => value?.trim() !== "");
    const newExpectedValues = expectedValues.filter(
      (value) => value?.trim() !== ""
    );
    const newInputs = inputs.filter((obj) =>
      Object.values(obj).every(
        (value) => typeof value !== "string" || value.trim() !== ""
      )
    );

    if (
      !context?.newContractConditionInfo?.contractAddress ||
      context?.newContractConditionInfo?.contractAddress?.trim() === ""
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Contract Address Missing. Try Again.",
        image: "QmQaUjMfMg1hmxyfHdAdeeT6hiw4JEbMkqKARexCytEMLu",
      });
    } else if (
      !context?.newContractConditionInfo?.contractAddress?.startsWith("0x")
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Contract Address Invalid. Try Again.",
        image: "QmUQVRH5iX5FhqDN3dpN5ZGGAguaUh7MbTN6p1U9B2tB3r",
      });
    } else if (
      !context?.newContractConditionInfo?.eventName ||
      context?.newContractConditionInfo?.eventName?.trim() === ""
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Event Name Missing. Try Again.",
        image: "QmRyjnEuR6sKeejA92eRbUXFZg9G6BtXQRprwgLc9zNkNn",
      });
    } else if (newEventArgs?.length < 1) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Event Args Missing. Try Again.",
        image: "Qmeu1VLZewUTJ7NvyY3fn8Kmr8MReFGJYMmbxzNqqmYVUf",
      });
    } else if (
      !context?.newContractConditionInfo?.matchOperator ||
      context?.newContractConditionInfo?.matchOperator?.trim() === ""
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Match Operator Missing. Try Again.",
        image: "Qmcz8vhEfNK5dyryED1rp6p1LE6CBJLr9XRNxsyrbqrFoK",
      });
    } else if (
      !checkMatchOperator(context?.newContractConditionInfo?.matchOperator)
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Invalid Match Operator. Try Again.",
        image: "QmQM6CYN8fms9E4oJnzfUGUHdVawwFvVz9HY5vT32FmHz2",
      });
    } else if (newExpectedValues?.length < 1) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Expected Values Missing. Try Again.",
        image: "QmcqV3qmqJhzqmqEM6kRaPtgmyxMYnUfsRrkdbTDYxCsJw",
      });
    } else if (expectedValues?.length !== eventArgs?.length) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message:
          "Each Event Arg Needs A Corresponding Expected Value. Try Again.",
        image: "QmXiYwejG2YZrNuo7xAsAWAmmkqU2Wbzwj1URDkaP9FuMQ",
      });
    } else if (newInputs?.length < 1) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Contract ABI Inputs Missing. Try Again.",
        image: "QmRWHaMFya1MHuS7ysQesSDYjcqtdygq17aFk4PUdg7dVh",
      });
    }

    return { checker, newInputs, newExpectedValues, newEventArgs };
  };

  const checkWebhookCondition = (): {
    checker: boolean;
    newBaseURL: string;
    newEndpoint: string;
  } => {
    let checker = true;
    const newBaseURL = !context?.newWebhookConditionInfo?.baseUrl?.endsWith("/")
      ? context?.newWebhookConditionInfo?.baseUrl + "/"
      : context?.newWebhookConditionInfo?.baseUrl;
    const newEndpoint = context?.newWebhookConditionInfo?.endpoint.startsWith(
      "/"
    )
      ? context?.newWebhookConditionInfo?.endpoint?.substring(1)
      : context?.newWebhookConditionInfo?.endpoint!;
    if (
      !context?.newWebhookConditionInfo?.baseUrl ||
      context?.newWebhookConditionInfo?.baseUrl?.trim() === ""
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Base URL Missing. Try Again.",
        image: "QmTwJR5WigvzU2WcXsRRbqZY4Av6EfGokmUMz6n1pKL9BL",
      });
    } else if (
      !context?.newWebhookConditionInfo?.endpoint ||
      context?.newWebhookConditionInfo?.endpoint?.trim() === ""
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Endpoint Missing. Try Again.",
        image: "QmQspswKVpm8MTGfw7esAN6estvHtXhANycx9iUEYPmHsD",
      });
    } else if (!checkBaseURL(context?.newWebhookConditionInfo?.baseUrl)) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Base URL Invalid. Try Again.",
        image: "Qmdont4GbQx4BhgdF1FWvhCow21rRTjst6wwESNNLxN5QJ",
      });
    } else if (!checkEndpoint(context?.newWebhookConditionInfo?.endpoint)) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Endpoint Invalid. Try Again.",
        image: "QmWgZnGb5HLEAXZ9y5N7fxAFvoTvb5Bv6CbLaMdfCQSLbS",
      });
    } else if (
      !context?.newWebhookConditionInfo?.matchOperator ||
      context?.newWebhookConditionInfo?.matchOperator?.trim() === ""
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Match Operator Missing. Try Again.",
        image: "QmfM8CZg7C4T4338VL7gEb9VwhcFqYR3GKE75z472oaUiZ",
      });
    } else if (
      !checkMatchOperator(context?.newWebhookConditionInfo?.matchOperator)
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Invalid Match Operator. Try Again.",
        image: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
      });
    } else if (
      !context?.newWebhookConditionInfo?.responsePath ||
      context?.newWebhookConditionInfo?.responsePath?.trim() === ""
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Response Path Missing. Try Again.",
        image: "Qmf3knH67VUqS2icK5hbkSUqRTxCFdbfdZnyxWPrJVG5w4",
      });
    } else if (
      !checkResponsePath(context?.newWebhookConditionInfo?.responsePath)
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Response Path Invalid. Try Again.",
        image: "Qmez3hLGshhkVjobBpaCATxnMyLpBhBvDmRSEVGdAxJijE",
      });
    } else if (
      !context?.newWebhookConditionInfo?.expectedValue ||
      context?.newWebhookConditionInfo?.expectedValue?.toString()?.trim() === ""
    ) {
      checker = false;
      context?.setGeneralModal({
        open: true,
        message: "Expected Value Missing. Try Again.",
        image: "QmUzzkGb1HKfixUnyKbVDHVb9TG9nYpdYQhL6uZckRETow",
      });
    }

    return { checker, newBaseURL, newEndpoint };
  };

  const handleAddConditionAndReset = () => {
    if (conditionType === "contract" && context?.conditionFlow?.index !== 0) {
      const { checker, newInputs, newEventArgs, newExpectedValues } =
        checkContractCondition();
      if (!checker) {
        return;
      }

      const abi = buildABI(
        context?.newContractConditionInfo?.eventName!,
        newInputs
      );

      context?.setCircuitInformation((prev) => ({
        ...prev,
        conditions: [
          ...prev.conditions,
          {
            ...context?.newContractConditionInfo,
            id:
              prev.conditions?.length > 0
                ? prev.conditions?.length?.toString()
                : "1",
            abi,
            chainId: context?.newContractConditionInfo?.chainId || "ethereum",
            eventArgName: newEventArgs,
            expectedValue: newExpectedValues,
          } as ContractCondition,
        ],
      }));

      context?.setNewContractConditionInfo(undefined);
      setEventArgs([]);
      setExpectedValues([]);
    } else if (context?.conditionFlow?.index !== 0) {
      const { checker, newBaseURL, newEndpoint } = checkWebhookCondition();
      if (!checker) {
        return;
      }

      context?.setCircuitInformation((prev) => ({
        ...prev,
        conditions: [
          ...prev.conditions,
          {
            ...context?.newWebhookConditionInfo,
            id:
              prev.conditions?.length > 0
                ? prev.conditions?.length?.toString()
                : "1",
            baseUrl: newBaseURL,
            endpoint: newEndpoint,
          } as WebhookCondition,
        ],
      }));

      context?.setNewWebhookConditionInfo(undefined);
    }
  };

  const handleUpdateCondition = () => {
    if (conditionType === "contract") {
      const { checker, newInputs, newEventArgs, newExpectedValues } =
        checkContractCondition();
      if (!checker) {
        return;
      }

      const abi = buildABI(
        context?.newContractConditionInfo?.eventName!,
        newInputs
      );

      context?.setCircuitInformation((prev) => ({
        ...prev,
        conditions: prev.conditions.map((obj) =>
          obj.id === context?.newContractConditionInfo?.id
            ? {
                ...obj,
                ...({
                  ...context?.newContractConditionInfo,
                  chainId:
                    context?.newContractConditionInfo?.chainId || "ethereum",
                  abi,
                  eventArgName: newEventArgs,
                  expectedValue: newExpectedValues,
                } as ContractCondition),
              }
            : obj
        ),
      }));

      context?.setNewContractConditionInfo(undefined);

      setEventArgs([""]);
      setExpectedValues([""]);
    } else {
      const { checker, newBaseURL, newEndpoint } = checkWebhookCondition();
      if (!checker) {
        return;
      }

      context?.setCircuitInformation((prev) => ({
        ...prev,
        conditions: prev.conditions.map((obj) =>
          obj.id === context?.newWebhookConditionInfo?.id
            ? ({
                ...obj,
                ...{
                  ...context?.newWebhookConditionInfo,
                  baseUrl: newBaseURL,
                  endpoint: newEndpoint,
                },
              } as WebhookCondition)
            : obj
        ),
      }));
      context?.setNewWebhookConditionInfo(undefined);
    }

    setEditingState(false);
  };

  useEffect(() => {
    if (expectedValues && expectedValues.length < eventArgs.length) {
      setExpectedValues((prevExpectedValues) => [
        ...prevExpectedValues,
        ...new Array(eventArgs.length - prevExpectedValues.length).fill(
          undefined
        ),
      ]);
    } else if (eventArgs && eventArgs.length < expectedValues.length) {
      setEventArgs((prevEventArgs) => [
        ...prevEventArgs,
        ...new Array(expectedValues.length - prevEventArgs.length).fill(
          undefined
        ),
      ]);
    }
  }, [eventArgs.length, expectedValues.length]);

  return {
    conditionType,
    setConditionType,
    handleAddConditionAndReset,
    eventArgs,
    setEventArgs,
    expectedValues,
    setExpectedValues,
    dropDownChainContract,
    setDropDownChainContract,
    editingState,
    setEditingState,
    handleUpdateCondition,
    inputs,
    setInputs,
    dropDownsOpenContract,
    setDropDownsOpenContract,
    apiPassword,
    setApiPassword,
    text,
    setText,
    overviewOpen,
    setOverviewOpen,
  };
};

export default useSetConditions;
