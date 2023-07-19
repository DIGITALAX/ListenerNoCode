import { FunctionComponent } from "react";
import { SetConditionsProps } from "@/components/CircuitFlow/types/circuitflow.types";
import Choice from "./ConditionInput/Choice";
import Input from "./ConditionInput/Input";
import { setNewWebhookConditionInformation } from "../../../../../../redux/reducers/newWebhookConditionInformationSlice";
import FinalCondition from "./ConditionInput/FinalCondition";
import { setNewContractConditionInformation } from "../../../../../../redux/reducers/newContractConditionInformationSlice";
import DropDown from "./ConditionInput/DropDown";
import Abi from "./ConditionInput/Abi";
import Args from "./ConditionInput/Args";

const SetConditions: FunctionComponent<SetConditionsProps> = ({
  dispatch,
  circuitInformation,
  conditionType,
  setConditionType,
  newContractConditionInformation,
  handleAddConditionAndReset,
  eventArgs,
  setEventArgs,
  expectedValues,
  setExpectedValues,
  newWebhookConditionInformation,
  editingState,
  setEditingState,
  handleUpdateCondition,
  conditionFlowIndex,
  setDropDownChainContract,
  dropDownChainContract,
  inputs,
  setInputs,
  dropDownsOpenContract,
  setDropDownsOpenContract,
  apiPassword,
  setApiPassword,
}): JSX.Element => {
  switch (conditionType) {
    case "contract":
      switch (conditionFlowIndex.index) {
        case 6:
          return (
            <FinalCondition
              conditionInformation={newContractConditionInformation}
              conditionType={conditionType}
              editingState={editingState}
              conditionFlowIndex={conditionFlowIndex}
              handleAddConditionAndReset={handleAddConditionAndReset}
              handleUpdateCondition={handleUpdateCondition}
              dispatch={dispatch}
              inputs={inputs}
              eventArgs={eventArgs}
              expectedValues={expectedValues}
            />
          );

        case 5:
          return (
            <div className="relative w-fit h-fit flex flex-col items-center justify-center gap-3">
              <div className="relative w-full h-fit flex flex-row gap-3">
                <Args
                  args={eventArgs}
                  setOnChangeArgs={(value: string, index: number) => {
                    const updatedEventArgs = [...eventArgs];
                    updatedEventArgs[index] = value;
                    setEventArgs(updatedEventArgs);
                  }}
                  setAddMoreArgs={() => setEventArgs([...eventArgs, ""])}
                  placeholderText={"enter event name arg"}
                  nameTitle={"Event Name Args"}
                />
                <Args
                  args={expectedValues}
                  setOnChangeArgs={(value: string, index: number) => {
                    const updatedExpectedValues = [...expectedValues];
                    updatedExpectedValues[index] = value;
                    setExpectedValues(updatedExpectedValues);
                  }}
                  setAddMoreArgs={() =>
                    setExpectedValues([...expectedValues, ""])
                  }
                  placeholderText={
                    "object, number, array, bigint, bytes, string"
                  }
                  nameTitle={"Expected Values"}
                />
              </div>
              <Input
                onChangeFunction={[
                  (value: string) =>
                    dispatch(
                      setNewContractConditionInformation({
                        ...newContractConditionInformation!,
                        matchOperator: value as any,
                      })
                    ),
                ]}
                changedValue={[newContractConditionInformation?.matchOperator]}
                text={["Match Operator"]}
                count={1}
                placeholderText={["=== <= >= == != !== > <"]}
              />
            </div>
          );

        case 4:
          return (
            <Abi
              inputs={inputs}
              setInputs={setInputs}
              dropDownsOpenContract={dropDownsOpenContract}
              setDropDownsOpenContract={setDropDownsOpenContract}
            />
          );

        case 3:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  dispatch(
                    setNewContractConditionInformation({
                      ...newContractConditionInformation!,
                      eventName: value,
                    })
                  ),
              ]}
              changedValue={[newContractConditionInformation?.eventName]}
              text={["Event Name"]}
              count={1}
              placeholderText={["enter event name"]}
            />
          );

        case 2:
          return (
            <DropDown
              setDropDownOpen={() => setDropDownChainContract(true)}
              setDropDownOpenIndex={(type: string) => {
                setDropDownChainContract(false);
                dispatch(
                  setNewContractConditionInformation({
                    ...newContractConditionInformation!,
                    chainId: type as any,
                  })
                );
              }}
              dropDownOpen={dropDownChainContract}
              inputChosen={
                newContractConditionInformation?.chainId
                  ? String(newContractConditionInformation?.chainId)
                  : "ethereum"
              }
              title={"Chain Name"}
            />
          );

        case 1:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  dispatch(
                    setNewContractConditionInformation({
                      ...newContractConditionInformation!,
                      contractAddress: value as `0x${string}`,
                    })
                  ),
              ]}
              changedValue={[newContractConditionInformation?.contractAddress]}
              text={["Contract Address"]}
              count={1}
              placeholderText={["enter contract address"]}
            />
          );

        default:
          return (
            <Choice
              editingState={editingState}
              setConditionType={setConditionType}
              conditionType={conditionType}
            />
          );
      }
    default:
      switch (conditionFlowIndex.index) {
        case 6:
          return (
            <FinalCondition
              conditionInformation={newWebhookConditionInformation}
              conditionType={conditionType}
              editingState={editingState}
              conditionFlowIndex={conditionFlowIndex}
              handleAddConditionAndReset={handleAddConditionAndReset}
              handleUpdateCondition={handleUpdateCondition}
              dispatch={dispatch}
              apiPassword={apiPassword}
              setApiPassword={setApiPassword}
            />
          );

        case 5:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  dispatch(
                    setNewWebhookConditionInformation({
                      ...newWebhookConditionInformation!,
                      expectedValue: value,
                    })
                  ),
                (value: string) =>
                  dispatch(
                    setNewWebhookConditionInformation({
                      ...newWebhookConditionInformation!,
                      matchOperator: value as any,
                    })
                  ),
              ]}
              changedValue={[
                String(newWebhookConditionInformation?.expectedValue || ""),
                newWebhookConditionInformation?.matchOperator,
              ]}
              text={["Expected Value", "Match Operator"]}
              count={2}
              placeholderText={[
                "enter expected value",
                "=== <= >= == != !== > <",
              ]}
            />
          );

        case 4:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  dispatch(
                    setNewWebhookConditionInformation({
                      ...newWebhookConditionInformation!,
                      apiKey: value,
                    })
                  ),
              ]}
              changedValue={[newWebhookConditionInformation?.apiKey]}
              text={["API Key"]}
              placeholderText={["enter api key"]}
              count={1}
              password={apiPassword}
              setAPIPassword={setApiPassword}
            />
          );
        case 3:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  dispatch(
                    setNewWebhookConditionInformation({
                      ...newWebhookConditionInformation!,
                      responsePath: value,
                    })
                  ),
              ]}
              changedValue={[newWebhookConditionInformation?.responsePath]}
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
                    setNewWebhookConditionInformation({
                      ...newWebhookConditionInformation!,
                      endpoint: value,
                    })
                  ),
              ]}
              changedValue={[newWebhookConditionInformation?.endpoint]}
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
                    setNewWebhookConditionInformation({
                      ...newWebhookConditionInformation!,
                      baseUrl: value,
                    })
                  ),
              ]}
              changedValue={[newWebhookConditionInformation?.baseUrl]}
              text={["Base URL"]}
              count={1}
              placeholderText={["enter base url"]}
            />
          );

        default:
          return (
            <Choice
              editingState={editingState}
              setConditionType={setConditionType}
              conditionType={conditionType}
            />
          );
      }
  }

  // <div className="relative w-full h-full flex flex-col p-1.5">
  {
    /*       
      <AllConditions
        dispatch={dispatch}
        circuitInformation={circuitInformation}
        setConditionType={setConditionType}
        setEditingState={setEditingState}
      />
      <div className="relative w-full h-full flex flex-row items-center justify-center">
    
        <ConditionTypeSwitcher
          dispatch={dispatch}
          conditionType={conditionType}
          newContractConditionInformation={newContractConditionInformation}
          newWebhookConditionInformation={newWebhookConditionInformation}
          outputs={outputs}
          setOutputs={setOutputs}
          inputs={inputs}
          setInputs={setInputs}
          dropDownsOpenContract={dropDownsOpenContract}
          setDropDownsOpenContract={setDropDownsOpenContract}
          
          expectedValues={expectedValues}
          setExpectedValues={setExpectedValues}
        />
      </div>
      
  }
  {
    /* </div> */
  }
};

export default SetConditions;
