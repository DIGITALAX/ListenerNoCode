import { FunctionComponent } from "react";
import FinalAction from "./FinalAction";
import { SetActionsProps } from "@/components/CircuitFlow/types/circuitflow.types";
import Choice from "../../Common/Choice";
import Input from "../../Common/Input";
import { setNewFetchActionInformation } from "../../../../../../redux/reducers/newFetchActionInformationSlice";
import Args from "../../Common/Args";
import Abi from "../../Common/Abi";
import DropDown from "../../Common/DropDown";
import { setNewContractActionInformation } from "../../../../../../redux/reducers/newContractActionInformationSlice";
import SignCondition from "./SignCondition";

const SetActions: FunctionComponent<SetActionsProps> = ({
  dispatch,
  circuitInformation,
  actionType,
  setActionType,
  newContractActionInformation,
  handleAddActionAndReset,
  actionOutputs,
  setActionOutputs,
  actionInputs,
  setActionInputs,
  dropDownsOpenAction,
  setDropDownsOpenAction,
  functionArgs,
  setFunctionArgs,
  newFetchActionInformation,
  editingStateAction,
  handleUpdateAction,
  payable,
  setPayable,
  stateMutability,
  setStateMutability,
  signConditions,
  setSignConditions,
  actionFlowIndex,
  apiPasswordAction,
  setApiPasswordAction,
  setDropDownChainContractAction,
  dropDownChainContractAction,
  dropDownsSignOpen,
  setDropDownsSignOpen,
}): JSX.Element => {
  switch (actionType) {
    case "contract":
      switch (actionFlowIndex.index) {
        case 7:
          return (
            <FinalAction
              circuitInformation={circuitInformation}
              actionInformation={newContractActionInformation}
              actionType={actionType}
              editingState={editingStateAction}
              actionFlowIndex={actionFlowIndex}
              handleAddActionAndReset={handleAddActionAndReset}
              handleUpdateAction={handleUpdateAction}
              dispatch={dispatch}
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
              args={functionArgs}
              setOnChangeArgs={(value: string, index: number) => {
                const updatedEventArgs = [...functionArgs];
                updatedEventArgs[index] = value;
                setFunctionArgs(updatedEventArgs);
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
              outputs={actionOutputs}
              setOutputs={setActionOutputs}
              type={"output"}
              payable={payable}
              stateMutability={stateMutability}
              setPayable={setPayable}
              setStateMutability={setStateMutability}
            />
          );

        case 4:
          return (
            <Abi
              inputs={actionInputs}
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
                  dispatch(
                    setNewContractActionInformation({
                      ...newContractActionInformation!,
                      functionName: value,
                    })
                  ),
              ]}
              changedValue={[newContractActionInformation?.functionName]}
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
                dispatch(
                  setNewContractActionInformation({
                    ...newContractActionInformation!,
                    chainId: type as any,
                  })
                );
              }}
              dropDownOpen={dropDownChainContractAction}
              inputChosen={
                newContractActionInformation?.chainId
                  ? String(newContractActionInformation?.chainId)
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
                  dispatch(
                    setNewContractActionInformation({
                      ...newContractActionInformation!,
                      contractAddress: value as `0x${string}`,
                    })
                  ),
              ]}
              changedValue={[newContractActionInformation?.contractAddress]}
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
      switch (actionFlowIndex.index) {
        case 6:
          return (
            <FinalAction
              circuitInformation={circuitInformation}
              actionInformation={newFetchActionInformation}
              actionType={actionType}
              editingState={editingStateAction}
              actionFlowIndex={actionFlowIndex}
              handleAddActionAndReset={handleAddActionAndReset}
              handleUpdateAction={handleUpdateAction}
              dispatch={dispatch}
              apiPassword={apiPasswordAction}
              setApiPassword={setApiPasswordAction}
              signConditions={signConditions}
            />
          );

        case 5:
          return (
            <SignCondition
              signConditions={signConditions}
              dropDownsOpen={dropDownsSignOpen}
              setToSign={(value: string) =>
                dispatch(
                  setNewFetchActionInformation({
                    ...newFetchActionInformation!,
                    toSign: value as any,
                  })
                )
              }
              toSignValue={
                !newFetchActionInformation?.toSign
                  ? ""
                  : typeof newFetchActionInformation?.toSign === "string"
                  ? newFetchActionInformation?.toSign
                  : Array.isArray(newFetchActionInformation?.toSign)
                  ? newFetchActionInformation.toSign
                      .map((code) => String.fromCharCode(Number(code)))
                      .join("")
                  : ""
              }
              setAddSignConditions={() =>
                setSignConditions([
                  ...signConditions,
                  {
                    type: "&&",
                    operator: "==",
                    value: "",
                    valueType: "string",
                  },
                ])
              }
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
                  dispatch(
                    setNewFetchActionInformation({
                      ...newFetchActionInformation!,
                      apiKey: value,
                    })
                  ),
              ]}
              changedValue={[newFetchActionInformation?.apiKey]}
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
                  dispatch(
                    setNewFetchActionInformation({
                      ...newFetchActionInformation!,
                      responsePath: value,
                    })
                  ),
              ]}
              changedValue={[newFetchActionInformation?.responsePath]}
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
                  dispatch(
                    setNewFetchActionInformation({
                      ...newFetchActionInformation!,
                      endpoint: value,
                    })
                  ),
              ]}
              changedValue={[newFetchActionInformation?.endpoint]}
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
                  dispatch(
                    setNewFetchActionInformation({
                      ...newFetchActionInformation!,
                      baseUrl: value,
                    })
                  ),
              ]}
              changedValue={[newFetchActionInformation?.baseUrl]}
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
