import { FunctionComponent } from "react";
import { CircuitSwitchProps } from "../../types/circuitflow.types";
import SetConditions from "../SetConditions/modules/SetConditions";

const CircuitSwitch: FunctionComponent<CircuitSwitchProps> = ({
  circuitFlowIndex,
  dispatch,
  circuitInformation,
  setConditionType,
  conditionType,
  newConditionInformation,
  setNewConditionInformation
}): JSX.Element => {
  switch (circuitFlowIndex) {
    default:
      return (
        <SetConditions
          circuitInformation={circuitInformation}
          dispatch={dispatch}
          conditionType={conditionType}
          setConditionType={setConditionType}
          newConditionInformation={newConditionInformation}
          setNewConditionInformation={setNewConditionInformation}
        />
      );
  }
};

export default CircuitSwitch;
