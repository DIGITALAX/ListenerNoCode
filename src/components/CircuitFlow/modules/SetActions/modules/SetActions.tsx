import { FunctionComponent, useContext } from "react";
import FinalAction from "./FinalAction";
import Choice from "../../Common/Choice";
import Input from "../../Common/Input";
import Args from "../../Common/Args";
import Abi from "../../Common/Abi";
import DropDown from "../../Common/DropDown";
import SignCondition from "./SignCondition";
import { ModalContext } from "@/pages/_app";
import { SetActionsProps } from "@/components/CircuitFlow/types/circuitflow.types";

const SetActions: FunctionComponent<SetActionsProps> = ({
  actionType,
  setActionType,
  handleAddActionAndReset,
  actionOutputs,
  setActionOutputs,
  actionInputs,
  setActionInputs,
  dropDownsOpenAction,
  setDropDownsOpenAction,
  functionArgs,
  setFunctionArgs,
  editingStateAction,
  handleUpdateAction,
  payable,
  setPayable,
  stateMutability,
  setStateMutability,
  signConditions,
  setSignConditions,
  apiPasswordAction,
  setApiPasswordAction,
  setDropDownChainContractAction,
  dropDownChainContractAction,
  dropDownsSignOpen,
  setDropDownsSignOpen,
}): JSX.Element => {
  const context = useContext(ModalContext);
  switch (actionType) {
    case "contract":
      switch (context?.actionFlow?.index) {
        case 7:
          return (
            <FinalAction
              actionType={actionType}
              editingState={editingStateAction}
              handleAddActionAndReset={handleAddActionAndReset}
              handleUpdateAction={handleUpdateAction}
              apiPassword={apiPasswordAction}
              setApiPassword={setApiPasswordAction}
              functionArgs={functionArgs}
              inputs={actionInputs}
              outputs={actionOutputs}
            />
          );

        case 6:
          return (
            <Args
              args={
                context?.newContractActionInfo?.args &&
                context?.newContractActionInfo?.args?.length > 0
                  ? context?.newContractActionInfo?.args
                  : functionArgs
              }
              setOnChangeArgs={(value: string, index: number) => {
                const updatedFunctionArgs =
                  context?.newContractActionInfo?.args &&
                  context?.newContractActionInfo?.args?.length > 0
                    ? [...context?.newContractActionInfo?.args]
                    : [...functionArgs];
                updatedFunctionArgs[index] = value;
                setFunctionArgs(updatedFunctionArgs);
              }}
              setAddMoreArgs={() => setFunctionArgs([...functionArgs, ""])}
              placeholderText={"enter function args"}
              nameTitle={"Function Args"}
            />
          );

        case 5:
          return (
            <Abi
              dropDownsOpen={dropDownsOpenAction}
              setDropDownsOpen={setDropDownsOpenAction}
              outputs={
                (context?.newContractActionInfo?.abi as any)?.[0]?.outputs
                  ?.length > 0
                  ? (context?.newContractActionInfo?.abi as any)?.[0]?.outputs
                  : actionOutputs
              }
              setOutputs={setActionOutputs}
              type={"output"}
              payable={
                (context?.newContractActionInfo?.abi as any)?.[0]?.payable
                  ? (context?.newContractActionInfo?.abi as any)?.[0]?.payable
                  : payable
              }
              stateMutability={
                (context?.newContractActionInfo?.abi as any)?.[0]
                  ?.stateMutability
                  ? (context?.newContractActionInfo?.abi as any)?.[0]
                      ?.stateMutability
                  : stateMutability
              }
              setPayable={setPayable}
              setStateMutability={setStateMutability}
            />
          );

        case 4:
          return (
            <Abi
              inputs={
                (context?.newContractActionInfo?.abi as any)?.[0]?.inputs
                  ?.length > 0
                  ? (context?.newContractActionInfo?.abi as any)?.[0]?.inputs
                      ?.length
                  : actionInputs
              }
              setInputs={setActionInputs}
              dropDownsOpen={dropDownsOpenAction}
              setDropDownsOpen={setDropDownsOpenAction}
              type={"input"}
            />
          );

        case 3:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  context?.setNewContractActionInfo((prev) => ({
                    ...prev!,
                    functionName: value,
                  })),
              ]}
              changedValue={[context?.newContractActionInfo?.functionName]}
              text={["Function Name"]}
              count={1}
              placeholderText={["enter function name"]}
            />
          );

        case 2:
          return (
            <DropDown
              setDropDownOpen={() => setDropDownChainContractAction(true)}
              setDropDownOpenIndex={(type: string) => {
                setDropDownChainContractAction(false);

                context?.setNewContractActionInfo((prev) => ({
                  ...prev!,
                  chainId: type as any,
                }));
              }}
              dropDownOpen={dropDownChainContractAction}
              inputChosen={
                context?.newContractActionInfo?.chainId
                  ? String(context?.newContractActionInfo?.chainId)
                  : "ethereum"
              }
              title={"Chain Name"}
              inputArray={Array.from(["ethereum", "polygon", "mumbai"])}
            />
          );

        case 1:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  context?.setNewContractActionInfo((prev) => ({
                    ...prev!,
                    contractAddress: value as `0x${string}`,
                  })),
              ]}
              changedValue={[context?.newContractActionInfo?.contractAddress]}
              text={["Contract Address"]}
              count={1}
              placeholderText={["enter contract address"]}
            />
          );

        default:
          return (
            <Choice
              editingState={editingStateAction}
              setChoiceType={setActionType}
              choiceType={actionType}
              titleValues={["FETCH ACTION", "CONTRACT ACTION"]}
              arrayValues={["fetch", "contract"]}
            />
          );
      }

    default:
      switch (context?.actionFlow?.index) {
        case 6:
          return (
            <FinalAction
              actionType={actionType}
              editingState={editingStateAction}
              handleAddActionAndReset={handleAddActionAndReset}
              handleUpdateAction={handleUpdateAction}
              apiPassword={apiPasswordAction}
              setApiPassword={setApiPasswordAction}
              signConditions={signConditions}
            />
          );

        case 5:
          return (
            <SignCondition
              signConditions={
                (context?.newFetchActionInfo?.signCondition as any)?.length > 0
                  ? (context?.newFetchActionInfo?.signCondition as any)
                  : signConditions
              }
              dropDownsOpen={dropDownsSignOpen}
              setToSign={(value: string) =>
                context?.setNewFetchActionInfo((prev) => ({
                  ...prev!,
                  toSign: value as any,
                }))
              }
              toSignValue={
                !context?.newFetchActionInfo?.toSign
                  ? ""
                  : typeof context?.newFetchActionInfo?.toSign === "string"
                  ? context?.newFetchActionInfo?.toSign
                  : Array.isArray(context?.newFetchActionInfo?.toSign)
                  ? context?.newFetchActionInfo?.toSign
                      .map((code) => String.fromCharCode(Number(code)))
                      .join("")
                  : ""
              }
              setAddSignConditions={() => {
                const prevSign =
                  (context?.newFetchActionInfo?.signCondition as any)?.length >
                  0
                    ? (context?.newFetchActionInfo?.signCondition as any)
                    : signConditions;

                setSignConditions([
                  ...prevSign,
                  {
                    type: "&&",
                    operator: "==",
                    value: "",
                    valueType: "string",
                  },
                ]);
              }}
              setSignType={(index: number) => {
                setDropDownsSignOpen(((prevState: any) => {
                  const updatedSignTypes = [...prevState?.signType];
                  updatedSignTypes[index] = !dropDownsSignOpen?.signType[index];
                  return {
                    ...prevState,
                    signType: updatedSignTypes,
                  };
                }) as any);
              }}
              setSignOperator={(index: number, value: string) => {
                setSignConditions(((prevInputsArray: any) => {
                  const updatedOperatorArray = [...prevInputsArray];
                  const updatedObject = {
                    ...updatedOperatorArray[index],
                    operator: value,
                  };
                  updatedOperatorArray[index] = updatedObject;
                  return updatedOperatorArray;
                }) as any);
              }}
              setSignTypeDropDown={(index: number, type: string) => {
                setDropDownsSignOpen(((prevState: any) => {
                  const updatedSignTypes = [...prevState?.signType];
                  updatedSignTypes[index] = !dropDownsSignOpen?.signType[index];
                  return {
                    ...prevState,
                    signType: updatedSignTypes,
                  };
                }) as any);
                setSignConditions(((prevInputsArray: any) => {
                  const updatedSignsArray = [...prevInputsArray];

                  const updatedObject = {
                    ...updatedSignsArray[index],
                    type: type,
                  };
                  updatedSignsArray[index] = updatedObject;
                  return updatedSignsArray;
                }) as any);
              }}
              setSignValue={(index: number, value: string) => {
                setSignConditions(((prevInputsArray: any) => {
                  const updatedValueArray = [...prevInputsArray];
                  const updatedObject = {
                    ...updatedValueArray[index],
                    value: value,
                  };
                  updatedValueArray[index] = updatedObject;
                  return updatedValueArray;
                }) as any);
              }}
              setSignValueType={(index: number, type: string) => {
                setDropDownsSignOpen(((prevState: any) => {
                  const updatedValueTypes = [...prevState?.valueType];
                  updatedValueTypes[index] =
                    !dropDownsSignOpen?.valueType[index];
                  return {
                    ...prevState,
                    valueType: updatedValueTypes,
                  };
                }) as any);
                setSignConditions(((prevInputsArray: any) => {
                  const updatedValueTypesArray = [...prevInputsArray];
                  const updatedObject = {
                    ...updatedValueTypesArray[index],
                    valueType: type,
                  };
                  updatedValueTypesArray[index] = updatedObject;
                  return updatedValueTypesArray;
                }) as any);
              }}
              setSignValueTypeDropDown={(index: number) => {
                setDropDownsSignOpen(((prevState: any) => {
                  const updatedValueTypes = [...prevState?.valueType];
                  updatedValueTypes[index] =
                    !dropDownsSignOpen?.valueType[index];
                  return {
                    ...prevState,
                    valueType: updatedValueTypes,
                  };
                }) as any);
              }}
            />
          );

        case 4:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  context?.setNewFetchActionInfo((prev) => ({
                    ...prev!,
                    apiKey: value,
                  })),
              ]}
              changedValue={[context?.newFetchActionInfo?.apiKey]}
              text={["API Key"]}
              placeholderText={["enter api key"]}
              count={1}
              password={apiPasswordAction}
              setAPIPassword={setApiPasswordAction}
            />
          );
        case 3:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  context?.setNewFetchActionInfo((prev) => ({
                    ...prev!,
                    responsePath: value,
                  })),
              ]}
              changedValue={[context?.newFetchActionInfo?.responsePath]}
              text={["Response Path"]}
              count={1}
              placeholderText={["enter.response.path"]}
            />
          );
        case 2:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  context?.setNewFetchActionInfo((prev) => ({
                    ...prev!,
                    endpoint: value,
                  })),
              ]}
              changedValue={[context?.newFetchActionInfo?.endpoint]}
              text={["Endpoint"]}
              count={1}
              placeholderText={["enter endpoint"]}
            />
          );

        case 1:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  context?.setNewFetchActionInfo((prev) => ({
                    ...prev!,
                    baseUrl: value,
                  })),
              ]}
              changedValue={[context?.newFetchActionInfo?.baseUrl]}
              text={["Base URL"]}
              count={1}
              placeholderText={["enter base url"]}
            />
          );

        default:
          return (
            <Choice
              editingState={editingStateAction}
              setChoiceType={setActionType}
              choiceType={actionType}
              titleValues={["FETCH ACTION", "CONTRACT ACTION"]}
              arrayValues={["fetch", "contract"]}
            />
          );
      }
  }
};

export default SetActions;
