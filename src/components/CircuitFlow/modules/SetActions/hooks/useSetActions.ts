import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import { useEffect, useState } from "react";
import { setNewFetchActionInformation } from "../../../../../../redux/reducers/newFetchActionInformationSlice";
import {
  CHAIN_NAME,
  ContractAction,
  FetchAction,
} from "@/components/CircuitFlow/types/litlistener.types";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import { setNewContractActionInformation } from "../../../../../../redux/reducers/newContractActionInformationSlice";
import { setModalOpen } from "../../../../../../redux/reducers/modalOpenSlice";
import { checkResponsePath } from "../../../../../../lib/helpers/checkResponsePath";
import { checkEndpoint } from "../../../../../../lib/helpers/checkEndpoint";
import { checkBaseURL } from "../../../../../../lib/helpers/checkBaseURL";
import { typeChecker } from "../../../../../../lib/helpers/typeChecker";
import { checkSignCondition } from "../../../../../../lib/helpers/checkSignCondition";

const useSetActions = () => {
  const dispatch = useDispatch();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const newContractActionInformation = useSelector(
    (state: RootState) => state.app.newContractActionInformationReducer.value
  );
  const newFetchActionInformation = useSelector(
    (state: RootState) => state.app.newFetchActionInformationReducer.value
  );
  const [functionArgs, setFunctionArgs] = useState<string[]>([""]);
  const [actionType, setActionType] = useState<string>("contract");
  const [editingStateAction, setEditingStateAction] = useState<boolean>(false);
  const [apiPasswordAction, setApiPasswordAction] = useState<boolean>(false);
  const [dropDownChainContractAction, setDropDownChainContractAction] =
    useState<boolean>(false);
  const [stateMutability, setStateMutability] = useState<string>("external");
  const [signConditions, setSignConditions] = useState<
    {
      type: string;
      operator: string;
      value: boolean | number | string;
      valueType: boolean | number | string;
    }[]
  >([
    {
      type: "&&",
      operator: "==",
      value: "",
      valueType: "string",
    },
  ]);
  const [payable, setPayable] = useState<boolean>(false);
  const [dropDownsSignOpen, setDropDownsSignOpen] = useState<{
    signType: boolean[];
    valueType: boolean[];
  }>({
    signType: [false],
    valueType: [false],
  });
  const [dropDownsOpenAction, setDropDownsOpenAction] = useState<{
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
  }>({
    internalTypesInput: [false],
    typesInput: [false],
    internalTypesOutput: [false],
    typesOutput: [false],
    payable: false,
    stateMutability: false,
  });
  const [actionInputs, setActionInputs] = useState<
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
  const [actionOutputs, setActionOutputs] = useState<
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
      constant: true,
      inputs: [],
      outputs: [],
      stateMutability,
      payable,
    } as any;

    for (const input of inputs) {
      const { internalType, name, type } = input;
      const inputObj = {
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
    abi.type = "function";

    return abi;
  };

  const checkContractCondition = (): {
    checker: boolean;
    newInputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    newOutputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    convertedArgs: any[];
  } => {
    let checker = true;
    const newInputs = actionInputs.filter((obj) =>
      Object.values(obj).every(
        (value) => typeof value !== "string" || value.trim() !== ""
      )
    );
    const newOutputs = actionOutputs.filter((obj) =>
      Object.values(obj).every(
        (value) => typeof value !== "string" || value.trim() !== ""
      )
    );
    const { isValid, convertedArgs } = typeChecker(
      actionInputs,
      functionArgs.filter((value) => value?.trim() !== "")
    );

    if (
      !newContractActionInformation?.contractAddress ||
      newContractActionInformation?.contractAddress?.trim() === ""
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
      !newContractActionInformation?.contractAddress?.startsWith("0x")
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
      !newContractActionInformation?.functionName ||
      newContractActionInformation?.functionName?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Function Name Missing. Try Again.",
          actionImage: "QmRyjnEuR6sKeejA92eRbUXFZg9G6BtXQRprwgLc9zNkNn",
        })
      );
    } else if (
      !newContractActionInformation?.chainId ||
      newContractActionInformation?.chainId?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Chain Id Missing. Try Again.",
          actionImage: "QmU7QLvyHbSoGTxkDGBgCXDh5rsr9BBHubSsZBoYPcSeDq",
        })
      );
    } else if (newInputs?.length !== functionArgs?.length) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage:
            "Each Function Arg Needs A Corresponding ABI Input Value. Try Again.",
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
        .includes(newContractActionInformation?.chainId?.toLowerCase()!)
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Chain Name Invalid. Try Again.",
          actionImage: "QmaLbRzzCP1axGEd6vJsDs7Jm7hyyiBGYsnBfv3jW51KiX",
        })
      );
    } else if (!isValid || convertedArgs?.length < 1) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage:
            "Function Args must match Internal Input Type. Try Again.",
          actionImage: "QmaLbRzzCP1axGEd6vJsDs7Jm7hyyiBGYsnBfv3jW51KiX",
        })
      );
    }

    return { checker, newInputs, newOutputs, convertedArgs };
  };

  const checkWebhookCondition = (): {
    checker: boolean;
    newBaseURL: string;
    newEndpoint: string;
    updatedSignConditions:
      | {
          type: string;
          operator: string;
          value: boolean | number | string;
        }[]
      | undefined;
  } => {
    let checker = true;
    const newBaseURL = !newFetchActionInformation?.baseUrl?.endsWith("/")
      ? newFetchActionInformation?.baseUrl + "/"
      : newFetchActionInformation?.baseUrl;
    const newEndpoint = newFetchActionInformation?.endpoint?.startsWith("/")
      ? newFetchActionInformation?.endpoint?.substring(1)
      : newFetchActionInformation?.endpoint!;
    const { isValid, updatedSignConditions } =
      checkSignCondition(signConditions);
    if (
      !newFetchActionInformation?.baseUrl ||
      newFetchActionInformation?.baseUrl?.trim() === ""
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
      !newFetchActionInformation?.endpoint ||
      newFetchActionInformation?.endpoint?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Endpoint Missing. Try Again.",
          actionImage: "QmQspswKVpm8MTGfw7esAN6estvHtXhANycx9iUEYPmHsD",
        })
      );
    } else if (!checkBaseURL(newFetchActionInformation?.baseUrl!)) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Base URL Invalid. Try Again.",
          actionImage: "Qmdont4GbQx4BhgdF1FWvhCow21rRTjst6wwESNNLxN5QJ",
        })
      );
    } else if (!checkEndpoint(newFetchActionInformation?.endpoint!)) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Endpoint Invalid. Try Again.",
          actionImage: "QmWgZnGb5HLEAXZ9y5N7fxAFvoTvb5Bv6CbLaMdfCQSLbS",
        })
      );
    } else if (
      !newFetchActionInformation?.responsePath! ||
      newFetchActionInformation?.responsePath!?.trim() === ""
    ) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Response Path Missing. Try Again.",
          actionImage: "Qmf3knH67VUqS2icK5hbkSUqRTxCFdbfdZnyxWPrJVG5w4",
        })
      );
    } else if (!checkResponsePath(newFetchActionInformation?.responsePath!)) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Response Path Invalid. Try Again.",
          actionImage: "Qmez3hLGshhkVjobBpaCATxnMyLpBhBvDmRSEVGdAxJijE",
        })
      );
    } else if (!updatedSignConditions || !isValid) {
      checker = false;
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Sign Conditions Invalid. Try Again.",
          actionImage: "Qmez3hLGshhkVjobBpaCATxnMyLpBhBvDmRSEVGdAxJijE",
        })
      );
    }

    return { checker, newBaseURL, newEndpoint, updatedSignConditions };
  };

  const handleAddActionAndReset = () => {
    if (actionType === "contract") {
      const { checker, newInputs, newOutputs, convertedArgs } =
        checkContractCondition();

      if (!checker) {
        return;
      }

      const abi = buildABI(
        newContractActionInformation?.functionName!,
        newInputs,
        newOutputs
      );

      dispatch(
        setCircuitInformation({
          ...circuitInformation,
          actions: [
            ...circuitInformation.actions,
            {
              ...newContractActionInformation,
              type: "contract",
              priority: circuitInformation?.actions?.length + 1,
              abi,
              args: convertedArgs,
            } as ContractAction,
          ],
        })
      );
      dispatch(setNewContractActionInformation(undefined));
      setActionInputs([
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ]);
      setActionOutputs([
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ]);
      setFunctionArgs([""]);
      setDropDownsOpenAction({
        internalTypesInput: [false],
        typesInput: [false],
        internalTypesOutput: [false],
        typesOutput: [false],
        payable: false,
        stateMutability: false,
      });
      setDropDownsSignOpen({
        signType: [false],
        valueType: [false],
      });
    } else {
      const { checker, newBaseURL, newEndpoint, updatedSignConditions } =
        checkWebhookCondition();
      if (!checker) {
        return;
      }
      const buffer = Buffer.from(newFetchActionInformation?.toSign!);

      dispatch(
        setCircuitInformation({
          ...circuitInformation,
          actions: [
            ...circuitInformation.actions,
            {
              ...newFetchActionInformation,
              type: "fetch",
              priority: circuitInformation?.actions?.length + 1,
              baseUrl: newBaseURL,
              endpoint: newEndpoint,
              signCondition: updatedSignConditions,
              toSign: new Uint8Array(
                buffer.buffer,
                buffer.byteOffset,
                buffer.byteLength
              ),
            } as FetchAction,
          ],
        })
      );

      dispatch(setNewFetchActionInformation(undefined));
    }
  };

  const handleUpdateAction = () => {
    if (actionType === "contract") {
      const { checker, newInputs, newOutputs, convertedArgs } =
        checkContractCondition();

      if (!checker) {
        return;
      }

      const abi = buildABI(
        newContractActionInformation?.functionName!,
        newInputs,
        newOutputs
      );

      dispatch(
        setCircuitInformation({
          ...circuitInformation,
          actions: circuitInformation.actions.map((obj) =>
            obj.priority === newContractActionInformation?.priority
              ? {
                  ...obj,
                  ...({
                    ...newContractActionInformation,
                    abi,
                    args: convertedArgs,
                  } as ContractAction),
                }
              : obj
          ) as any,
        })
      );

      dispatch(setNewContractActionInformation(undefined));
      setActionInputs([
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ]);
      setActionOutputs([
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ]);
      setFunctionArgs([""]);
      setDropDownsOpenAction({
        internalTypesInput: [false],
        typesInput: [false],
        internalTypesOutput: [false],
        typesOutput: [false],
        payable: false,
        stateMutability: false,
      });
      setDropDownsSignOpen({
        signType: [false],
        valueType: [false],
      });
    } else {
      const { checker, newBaseURL, newEndpoint, updatedSignConditions } =
        checkWebhookCondition();
      if (!checker) {
        return;
      }
      const buffer = Buffer.from(newFetchActionInformation?.toSign!);

      dispatch(
        setCircuitInformation({
          ...circuitInformation,
          actions: circuitInformation.actions.map((obj) =>
            obj.priority === newFetchActionInformation?.priority
              ? ({
                  ...obj,
                  ...(!newFetchActionInformation?.toSign ||
                  (newFetchActionInformation?.toSign as any)?.trim() !== ""
                    ? {
                        ...newFetchActionInformation,
                        baseUrl: newBaseURL,
                        endpoint: newEndpoint,
                        signCondition: updatedSignConditions,
                      }
                    : {
                        ...newFetchActionInformation,
                        baseUrl: newBaseURL,
                        endpoint: newEndpoint,
                        signCondition: updatedSignConditions,
                        toSign: new Uint8Array(
                          buffer.buffer,
                          buffer.byteOffset,
                          buffer.byteLength
                        ),
                      }),
                } as FetchAction)
              : obj
          ),
        })
      );

      dispatch(setNewFetchActionInformation(undefined));
    }

    setEditingStateAction(false);
  };

  useEffect(() => {
    if (actionInputs) {
      if (functionArgs.length > actionInputs.length) {
        setFunctionArgs((prevFunctionArgs) => [
          ...prevFunctionArgs.slice(0, actionInputs.length),
        ]);
      } else if (actionInputs.length > functionArgs.length) {
        setFunctionArgs((prevFunctionArgs) => [
          ...prevFunctionArgs,
          ...new Array(actionInputs.length - prevFunctionArgs.length),
        ]);
      }
    }
  }, [actionInputs]);

  return {
    actionType,
    setActionType,
    editingStateAction,
    setEditingStateAction,
    payable,
    setPayable,
    stateMutability,
    setStateMutability,
    dropDownsOpenAction,
    setDropDownsOpenAction,
    functionArgs,
    setFunctionArgs,
    actionInputs,
    setActionInputs,
    actionOutputs,
    setActionOutputs,
    handleAddActionAndReset,
    handleUpdateAction,
    signConditions,
    setSignConditions,
    apiPasswordAction,
    setApiPasswordAction,
    dropDownChainContractAction,
    setDropDownChainContractAction,
    dropDownsSignOpen,
    setDropDownsSignOpen,
  };
};

export default useSetActions;
