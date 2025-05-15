import { useContext, useEffect, useState } from "react";
import {
  ContractAction,
  FetchAction,
} from "@/components/CircuitFlow/types/litlistener.types";
import { checkResponsePath } from "../../../../../../lib/helpers/checkResponsePath";
import { checkEndpoint } from "../../../../../../lib/helpers/checkEndpoint";
import { checkBaseURL } from "../../../../../../lib/helpers/checkBaseURL";
import { typeChecker } from "../../../../../../lib/helpers/typeChecker";
import { checkSignCondition } from "../../../../../../lib/helpers/checkSignCondition";
import { ModalContext } from "@/pages/_app";

const useSetActions = () => {
  const context = useContext(ModalContext);
  const [functionArgs, setFunctionArgs] = useState<string[]>([""]);
  const [actionType, setActionType] = useState<string>("contract");
  const [editingStateAction, setEditingStateAction] = useState<boolean>(false);
  const [apiPasswordAction, setApiPasswordAction] = useState<boolean>(false);
  const [dropDownChainContractAction, setDropDownChainContractAction] =
    useState<boolean>(false);
  const [stateMutability, setStateMutability] = useState<string>("nonpayable");
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
      constant:
        stateMutability === "pure" || stateMutability === "view" ? true : false,
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
        (value) =>
          typeof value !== "string" ||
          value.trim() !== "" ||
          typeof value !== "number" ||
          typeof value !== "boolean"
      )
    );
    const newOutputs = actionOutputs.filter((obj) =>
      Object.values(obj).every(
        (value) =>
          typeof value !== "string" ||
          typeof value !== "number" ||
          typeof value !== "boolean"
      )
    );

    const { isValid, convertedArgs } = typeChecker(
      actionInputs,
      functionArgs.filter((value) => value?.trim() !== "")
    );

    if (
      !context?.newContractActionInfo?.contractAddress ||
      context?.newContractActionInfo?.contractAddress?.trim() === ""
    ) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Contract Address Missing. Try Again.",
        image: "QmQaUjMfMg1hmxyfHdAdeeT6hiw4JEbMkqKARexCytEMLu",
      });
    } else if (
      !context?.newContractActionInfo?.contractAddress?.startsWith("0x")
    ) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Contract Address Invalid. Try Again.",
        image: "QmUQVRH5iX5FhqDN3dpN5ZGGAguaUh7MbTN6p1U9B2tB3r",
      });
    } else if (
      !context?.newContractActionInfo?.functionName ||
      context?.newContractActionInfo?.functionName?.trim() === ""
    ) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Function Name Missing. Try Again.",
        image: "QmRyjnEuR6sKeejA92eRbUXFZg9G6BtXQRprwgLc9zNkNn",
      });
    } else if (newInputs?.length !== functionArgs?.length) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message:
          "Each Function Arg Needs A Corresponding ABI Input Value. Try Again.",
        image: "QmXiYwejG2YZrNuo7xAsAWAmmkqU2Wbzwj1URDkaP9FuMQ",
      });
    } else if (newInputs?.length < 1) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Contract ABI Inputs Missing. Try Again.",
        image: "QmRWHaMFya1MHuS7ysQesSDYjcqtdygq17aFk4PUdg7dVh",
      });
    } else if (newOutputs?.length < 1) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Contract ABI Outputs Missing. Try Again.",
        image: "QmWMQKSDzchgfe3KSVSLh98ArZT2k9r8tV772T2EMEH9E4",
      });
    } else if (!isValid || convertedArgs?.length < 1) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Function Args must match Internal Input Type. Try Again.",
        image: "QmaLbRzzCP1axGEd6vJsDs7Jm7hyyiBGYsnBfv3jW51KiX",
      });
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
    const newBaseURL = !context?.newFetchActionInfo?.baseUrl?.endsWith("/")
      ? context?.newFetchActionInfo?.baseUrl + "/"
      : context?.newFetchActionInfo?.baseUrl;
    const newEndpoint = context?.newFetchActionInfo?.endpoint?.startsWith("/")
      ? context?.newFetchActionInfo?.endpoint?.substring(1)
      : context?.newFetchActionInfo?.endpoint!;
    const { isValid, updatedSignConditions } =
      checkSignCondition(signConditions);
    if (
      !context?.newFetchActionInfo?.baseUrl ||
      context?.newFetchActionInfo?.baseUrl?.trim() === ""
    ) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Base URL Missing. Try Again.",
        image: "QmTwJR5WigvzU2WcXsRRbqZY4Av6EfGokmUMz6n1pKL9BL",
      });
    } else if (
      !context?.newFetchActionInfo?.endpoint ||
      context?.newFetchActionInfo?.endpoint?.trim() === ""
    ) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Endpoint Missing. Try Again.",
        image: "QmQspswKVpm8MTGfw7esAN6estvHtXhANycx9iUEYPmHsD",
      });
    } else if (!checkBaseURL(context?.newFetchActionInfo?.baseUrl!)) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Base URL Invalid. Try Again.",
        image: "Qmdont4GbQx4BhgdF1FWvhCow21rRTjst6wwESNNLxN5QJ",
      });
    } else if (!checkEndpoint(context?.newFetchActionInfo?.endpoint!)) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Endpoint Invalid. Try Again.",
        image: "QmWgZnGb5HLEAXZ9y5N7fxAFvoTvb5Bv6CbLaMdfCQSLbS",
      });
    } else if (
      !context?.newFetchActionInfo?.responsePath! ||
      context?.newFetchActionInfo?.responsePath!?.trim() === ""
    ) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Response Path Missing. Try Again.",
        image: "Qmf3knH67VUqS2icK5hbkSUqRTxCFdbfdZnyxWPrJVG5w4",
      });
    } else if (!checkResponsePath(context?.newFetchActionInfo?.responsePath!)) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Response Path Invalid. Try Again.",
        image: "Qmez3hLGshhkVjobBpaCATxnMyLpBhBvDmRSEVGdAxJijE",
      });
    } else if (!updatedSignConditions || !isValid) {
      checker = false;

      context?.setGeneralModal({
        open: true,
        message: "Sign Conditions Invalid. Try Again.",
        image: "Qmez3hLGshhkVjobBpaCATxnMyLpBhBvDmRSEVGdAxJijE",
      });
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
        context?.newContractActionInfo?.functionName!,
        newInputs,
        newOutputs
      );

      context?.setCircuitInformation((prev) => ({
        ...prev,
        actions: [
          ...prev.actions,
          {
            ...context?.newContractActionInfo,
            type: "contract",
            priority: prev?.actions?.length,
            abi: [abi],
            chainId: context?.newContractActionInfo?.chainId || "ethereum",
            args: convertedArgs,
          } as unknown as ContractAction,
        ],
      }));

      context?.setNewContractActionInfo(undefined);
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
      setFunctionArgs([]);
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
      const buffer = Buffer.from(context?.newFetchActionInfo?.toSign!);

      context?.setCircuitInformation((prev) => ({
        ...prev,
        actions: [
          ...prev.actions,
          (context?.newFetchActionInfo?.toSign as any)?.trim() !== "" &&
          updatedSignConditions &&
          updatedSignConditions?.length > 0 &&
          (context?.newFetchActionInfo?.toSign as any)?.trim() !== ""
            ? ({
                ...context?.newFetchActionInfo,
                type: "fetch",
                priority: prev?.actions?.length,
                baseUrl: newBaseURL,
                endpoint: newEndpoint,
                signCondition: updatedSignConditions,
                toSign: new Uint8Array(
                  buffer.buffer,
                  buffer.byteOffset,
                  buffer.byteLength
                ),
              } as FetchAction)
            : !updatedSignConditions ||
              (updatedSignConditions?.length < 1 &&
                (context?.newFetchActionInfo?.toSign as any)?.trim() === "")
            ? ({
                ...context?.newFetchActionInfo,
                type: "fetch",
                priority: prev?.actions?.length,
                baseUrl: newBaseURL,
                endpoint: newEndpoint,
              } as FetchAction)
            : (context?.newFetchActionInfo?.toSign as any)?.trim() === ""
            ? ({
                ...context?.newFetchActionInfo,
                type: "fetch",
                priority: prev?.actions?.length,
                baseUrl: newBaseURL,
                endpoint: newEndpoint,
                signCondition: updatedSignConditions,
              } as FetchAction)
            : ({
                ...context?.newFetchActionInfo,
                type: "fetch",
                priority: prev?.actions?.length,
                baseUrl: newBaseURL,
                endpoint: newEndpoint,
                toSign: new Uint8Array(
                  buffer.buffer,
                  buffer.byteOffset,
                  buffer.byteLength
                ),
              } as FetchAction),
        ],
      }));

      context?.setNewFetchActionInfo(undefined);
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
        context?.newContractActionInfo?.functionName!,
        newInputs,
        newOutputs
      );

      context?.setCircuitInformation((prev) => ({
        ...prev,
        actions: prev.actions.map((obj) =>
          obj.priority === context?.newContractActionInfo?.priority
            ? {
                ...obj,
                ...({
                  ...context?.newContractActionInfo,
                  abi: [abi],
                  chainId:
                    context?.newContractActionInfo?.chainId || "ethereum",
                  args: convertedArgs,
                } as unknown as ContractAction),
              }
            : obj
        ) as any,
      }));

      context?.setNewContractActionInfo(undefined);
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
      setFunctionArgs([]);
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
      const buffer = Buffer.from(context?.newFetchActionInfo?.toSign!);

      context?.setCircuitInformation((prev) => ({
        ...prev,
        actions: prev.actions.map((obj) =>
          obj.priority === context?.newFetchActionInfo?.priority
            ? ({
                ...obj,
                ...(!context?.newFetchActionInfo?.toSign ||
                (context?.newFetchActionInfo?.toSign as any)?.trim() !== ""
                  ? {
                      ...context?.newFetchActionInfo,
                      baseUrl: newBaseURL,
                      endpoint: newEndpoint,
                      signCondition: updatedSignConditions,
                    }
                  : {
                      ...context?.newFetchActionInfo,
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
      }));

      context?.setNewFetchActionInfo(undefined);
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
