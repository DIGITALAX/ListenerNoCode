import { FunctionComponent } from "react";
import ContractCondition from "./ContractCondition";
import WebhookCondition from "./WebhookCondition";
import { ConditionSwitchProps } from "@/components/CircuitFlow/types/circuitflow.types";

const ConditionSwitch: FunctionComponent<ConditionSwitchProps> = ({
  conditionType,
  newContractConditionInformation,
  setNewContractConditionInformation,
  outputs,
  setOutputs,
  inputs,
  setInputs,
  dropDownsOpenContract,
  setDropDownsOpenContract,
  eventArgs,
  setEventArgs,
  expectedValues,
  setExpectedValues,
  matchFunctionsContract,
  setMatchFunctionsContract,
  newWebhookConditionInformation,
  setNewWebhookConditionInformation,
  matchFunctionsWebhook,
  setMatchFunctionsWebhook,
}): JSX.Element => {
  switch (conditionType) {
    case "web":
      return (
        <WebhookCondition
          setNewWebhookConditionInformation={setNewWebhookConditionInformation}
          newWebhookConditionInformation={newWebhookConditionInformation}
          matchFunctionsWebhook={matchFunctionsWebhook}
          setMatchFunctionsWebhook={setMatchFunctionsWebhook}
        />
      );

    default:
      return (
        <ContractCondition
          newContractConditionInformation={newContractConditionInformation}
          setNewContractConditionInformation={
            setNewContractConditionInformation
          }
          outputs={outputs}
          setOutputs={setOutputs}
          inputs={inputs}
          setInputs={setInputs}
          dropDownsOpenContract={dropDownsOpenContract}
          setDropDownsOpenContract={setDropDownsOpenContract}
          eventArgs={eventArgs}
          setEventArgs={setEventArgs}
          expectedValues={expectedValues}
          setExpectedValues={setExpectedValues}
          matchFunctionsContract={matchFunctionsContract}
          setMatchFunctionsContract={setMatchFunctionsContract}
        />
      );
  }
};

export default ConditionSwitch;
