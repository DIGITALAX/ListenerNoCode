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
import { SET_CONDITIONS_TEXT_WEBHOOK } from "../../../../../../lib/constants";

const useSetConditions = () => {
  const dispatch = useDispatch();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const conditionFlowIndex = useSelector(
    (state: RootState) => state.app.conditionFlowReducer.value
  );
  const newContractConditionInformation = useSelector(
    (state: RootState) => state.app.newContractConditionInformationReducer.value
  );
  const newWebhookConditionInformation = useSelector(
    (state: RootState) => state.app.newWebhookConditionInformationReducer.value
  );
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
      !newContractConditionInformation?.contractAddress?.startsWith("0x")
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
    }

    return { checker, newInputs, newExpectedValues, newEventArgs };
  };

  const checkWebhookCondition = (): {
    checker: boolean;
    newBaseURL: string;
    newEndpoint: string;
  } => {
    let checker = true;
    const newBaseURL = !newWebhookConditionInformation?.baseUrl?.endsWith("/")
      ? newWebhookConditionInformation?.baseUrl + "/"
      : newWebhookConditionInformation?.baseUrl;
    const newEndpoint = newWebhookConditionInformation?.endpoint.startsWith("/")
      ? newWebhookConditionInformation?.endpoint?.substring(1)
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
    }

    return { checker, newBaseURL, newEndpoint };
  };

  const handleAddConditionAndReset = () => {
    if (conditionType === "contract" && conditionFlowIndex.index !== 0) {
      const { checker, newInputs, newEventArgs, newExpectedValues } =
        checkContractCondition();
      if (!checker) {
        return;
      }

      const abi = buildABI(
        newContractConditionInformation?.eventName!,
        newInputs
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
              chainId: newContractConditionInformation?.chainId || "ethereum",
              eventArgName: newEventArgs,
              expectedValue: newExpectedValues,
            } as ContractCondition,
          ],
        })
      );
      dispatch(setNewContractConditionInformation(undefined));
      setEventArgs([]);
      setExpectedValues([]);
    } else if (conditionFlowIndex.index !== 0) {
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
        newContractConditionInformation?.eventName!,
        newInputs
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
                    chainId:
                      newContractConditionInformation?.chainId || "ethereum",
                    abi,
                    eventArgName: newEventArgs,
                    expectedValue: newExpectedValues,
                  } as ContractCondition),
                }
              : obj
          ),
        })
      );

      dispatch(setNewContractConditionInformation(undefined));

      setEventArgs([""]);
      setExpectedValues([""]);
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
                    endpoint: newEndpoint,
                  },
                } as WebhookCondition)
              : obj
          ),
        })
      );

      dispatch(setNewWebhookConditionInformation(undefined));
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
