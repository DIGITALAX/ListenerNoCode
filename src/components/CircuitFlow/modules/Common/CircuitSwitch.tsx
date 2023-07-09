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
  matchFunctions,
  setMatchFunctions,
  newWebhookConditionInformation,
  setNewWebhookConditionInformation,
  editingState,
  setEditingState,
  handleUpdateCondition
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
          matchFunctions={matchFunctions}
          setMatchFunctions={setMatchFunctions}
          setNewWebhookConditionInformation={setNewWebhookConditionInformation}
          newWebhookConditionInformation={newWebhookConditionInformation}
          editingState={editingState}
          setEditingState={setEditingState}
          handleUpdateCondition={handleUpdateCondition}
        />
      );
  }
};

export default CircuitSwitch;
