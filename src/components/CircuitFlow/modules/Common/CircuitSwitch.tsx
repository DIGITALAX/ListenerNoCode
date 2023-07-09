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
  handleAddConditionAndReset
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
        />
      );
  }
};

export default CircuitSwitch;
