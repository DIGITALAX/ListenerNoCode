import { FunctionComponent } from "react";
import { CircuitSwitchProps } from "../../types/circuitflow.types";
import SetConditions from "../SetConditions/modules/SetConditions";

const CircuitSwitch: FunctionComponent<CircuitSwitchProps> = ({
  circuitFlowIndex,
  dispatch,
  circuitInformation,
  setConditionType,
  conditionType,
  newContractConditionInformation,
  setNewContractConditionInformation,
  handleAddConditionAndReset,
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
  editingState,
  setEditingState,
  handleUpdateCondition,
  matchFunctionsWebhook,
  setMatchFunctionsWebhook,
}): JSX.Element => {
  switch (circuitFlowIndex) {
    default:
      return (
        <SetConditions
          circuitInformation={circuitInformation}
          dispatch={dispatch}
          conditionType={conditionType}
          setConditionType={setConditionType}
          newContractConditionInformation={newContractConditionInformation}
          setNewContractConditionInformation={
            setNewContractConditionInformation
          }
          handleAddConditionAndReset={handleAddConditionAndReset}
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
          setNewWebhookConditionInformation={setNewWebhookConditionInformation}
          newWebhookConditionInformation={newWebhookConditionInformation}
          editingState={editingState}
          setEditingState={setEditingState}
          handleUpdateCondition={handleUpdateCondition}
          matchFunctionsWebhook={matchFunctionsWebhook}
          setMatchFunctionsWebhook={setMatchFunctionsWebhook}
        />
      );
  }
};

export default CircuitSwitch;
