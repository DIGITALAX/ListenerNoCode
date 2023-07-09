import { FunctionComponent } from "react";
import ContractCondition from "./ContractCondition";
import WebhookCondition from "./WebhookCondition";
import { ConditionSwitchProps } from "@/components/CircuitFlow/types/circuitflow.types";

const ConditionSwitch: FunctionComponent<ConditionSwitchProps> = ({
  conditionType,
  newContractConditionInformation,
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
  matchFunctionsWebhook,
  setMatchFunctionsWebhook,
  dispatch,
}): JSX.Element => {
  switch (conditionType) {
    case "web":
      return (
        <WebhookCondition
          dispatch={dispatch}
          newWebhookConditionInformation={newWebhookConditionInformation}
          matchFunctionsWebhook={matchFunctionsWebhook}
          setMatchFunctionsWebhook={setMatchFunctionsWebhook}
        />
      );

    default:
      return (
        <ContractCondition
          dispatch={dispatch}
          newContractConditionInformation={newContractConditionInformation}
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
