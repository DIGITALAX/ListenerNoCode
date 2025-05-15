import { FunctionComponent, useContext } from "react";
import Choice from "../../Common/Choice";
import Input from "../../Common/Input";
import FinalCondition from "./FinalCondition";
import Abi from "../../Common/Abi";
import Args from "../../Common/Args";
import DropDown from "../../Common/DropDown";
import { ModalContext } from "@/pages/_app";
import { SetConditionsProps } from "@/components/CircuitFlow/types/circuitflow.types";

const SetConditions: FunctionComponent<SetConditionsProps> = ({
  conditionType,
  setConditionType,
  handleAddConditionAndReset,
  eventArgs,
  setEventArgs,
  expectedValues,
  setExpectedValues,
  editingState,
  handleUpdateCondition,
  setDropDownChainContract,
  dropDownChainContract,
  inputs,
  setInputs,
  dropDownsOpenContract,
  setDropDownsOpenContract,
  apiPassword,
  setApiPassword,
}): JSX.Element => {
  const context = useContext(ModalContext);
  switch (conditionType) {
    case "contract":
      switch (context?.conditionFlow?.index) {
        case 6:
          return (
            <FinalCondition
              conditionType={conditionType}
              editingState={editingState}
              handleAddConditionAndReset={handleAddConditionAndReset}
              handleUpdateCondition={handleUpdateCondition}
              inputs={inputs}
              eventArgs={eventArgs}
              expectedValues={expectedValues}
            />
          );

        case 5:
          return (
            <div className="relative w-fit h-60 galaxy:h-fit flex flex-col items-start galaxy:items-center justify-start  gap-3 relative w-full overflow-y-scroll grow">
              <div className="relative w-full h-fit flex flex-col renewed:flex-row gap-3 galaxy:items-center galaxy:justify-center">
                <Args
                  args={
                    context?.newContractConditionInfo?.eventArgName &&
                    context?.newContractConditionInfo?.eventArgName?.length > 0
                      ? context?.newContractConditionInfo?.eventArgName
                      : eventArgs
                  }
                  setOnChangeArgs={(value: string, index: number) => {
                    const updatedEventArgs =
                      context?.newContractConditionInfo?.eventArgName &&
                      context?.newContractConditionInfo?.eventArgName?.length >
                        0
                        ? [...context?.newContractConditionInfo?.eventArgName]
                        : [...eventArgs];
                    updatedEventArgs[index] = value;
                    setEventArgs(updatedEventArgs);
                  }}
                  setAddMoreArgs={() => setEventArgs([...eventArgs, ""])}
                  placeholderText={"enter event name arg"}
                  nameTitle={"Event Name Args"}
                />
                <Args
                  args={
                    context?.newContractConditionInfo?.expectedValue
                      ? context?.newContractConditionInfo?.expectedValue?.map(
                          String
                        )
                      : expectedValues
                  }
                  setOnChangeArgs={(value: string, index: number) => {
                    const updatedExpectedValues = context
                      ?.newContractConditionInfo?.expectedValue
                      ? [
                          ...context?.newContractConditionInfo?.expectedValue?.map(
                            String
                          ),
                        ]
                      : [...expectedValues];
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
                    context?.setNewContractConditionInfo((prev) => ({
                      ...prev!,
                      matchOperator: value as any,
                    })),
                ]}
                changedValue={[
                  context?.newContractConditionInfo?.matchOperator,
                ]}
                text={["Match Operator"]}
                count={1}
                placeholderText={["=== <= >= == != !== > <"]}
              />
            </div>
          );

        case 4:
          return (
            <Abi
              inputs={
                (context?.newContractConditionInfo?.abi as any)?.[0]?.inputs
                  ?.length > 0
                  ? (context?.newContractConditionInfo?.abi as any)?.[0]?.inputs
                  : inputs
              }
              setInputs={setInputs}
              dropDownsOpen={dropDownsOpenContract}
              setDropDownsOpen={setDropDownsOpenContract}
              type={"input"}
              indexed
            />
          );

        case 3:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  context?.setNewContractConditionInfo((prev) =>({
                    ...prev!,
                    eventName: value,
                  })),
              ]}
              changedValue={[context?.newContractConditionInfo?.eventName]}
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

                context?.setNewContractConditionInfo((prev) => ({
                  ...prev!,
                  chainId: type as any,
                }));
              }}
              dropDownOpen={dropDownChainContract}
              inputChosen={
                context?.newContractConditionInfo?.chainId
                  ? String(context?.newContractConditionInfo?.chainId)
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
                  context?.setNewContractConditionInfo((prev) => ({
                    ...prev!,
                    contractAddress: value as `0x${string}`,
                  })),
              ]}
              changedValue={[
                context?.newContractConditionInfo?.contractAddress,
              ]}
              text={["Contract Address"]}
              count={1}
              placeholderText={["enter contract address"]}
            />
          );

        default:
          return (
            <Choice
              editingState={editingState}
              setChoiceType={setConditionType}
              choiceType={conditionType}
              titleValues={["WEBHOOK CONDITION", "CONTRACT CONDITION"]}
              arrayValues={["web", "contract"]}
            />
          );
      }
    default:
      switch (context?.conditionFlow?.index) {
        case 6:
          return (
            <FinalCondition
              conditionType={conditionType}
              editingState={editingState}
              handleAddConditionAndReset={handleAddConditionAndReset}
              handleUpdateCondition={handleUpdateCondition}
              apiPassword={apiPassword}
              setApiPassword={setApiPassword}
            />
          );

        case 5:
          return (
            <Input
              onChangeFunction={[
                (value: string) =>
                  context?.setNewWebhookConditionInfo((prev) => ({
                    ...prev!,
                    expectedValue: value,
                  })),
                (value: string) =>
                  context?.setNewWebhookConditionInfo((prev) => ({
                    ...prev!,
                    matchOperator: value as any,
                  })),
              ]}
              changedValue={[
                String(context?.newWebhookConditionInfo?.expectedValue || ""),
                context?.newWebhookConditionInfo?.matchOperator,
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
                  context?.setNewWebhookConditionInfo((prev) => ({
                    ...prev!,
                    apiKey: value,
                  })),
              ]}
              changedValue={[context?.newWebhookConditionInfo?.apiKey]}
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
                  context?.setNewWebhookConditionInfo((prev) => ({
                    ...prev!,
                    responsePath: value,
                  })),
              ]}
              changedValue={[context?.newWebhookConditionInfo?.responsePath]}
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
                  context?.setNewWebhookConditionInfo((prev) => ({
                    ...prev!,
                    endpoint: value,
                  })),
              ]}
              changedValue={[context?.newWebhookConditionInfo?.endpoint]}
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
                  context?.setNewWebhookConditionInfo((prev) => ({
                    ...prev!,
                    baseUrl: value,
                  })),
              ]}
              changedValue={[context?.newWebhookConditionInfo?.baseUrl]}
              text={["Base URL"]}
              count={1}
              placeholderText={["enter base url"]}
            />
          );

        default:
          return (
            <Choice
              editingState={editingState}
              setChoiceType={setConditionType}
              choiceType={conditionType}
              titleValues={["WEBHOOK CONDITION", "CONTRACT CONDITION"]}
              arrayValues={["web", "contract"]}
            />
          );
      }
  }
};

export default SetConditions;
