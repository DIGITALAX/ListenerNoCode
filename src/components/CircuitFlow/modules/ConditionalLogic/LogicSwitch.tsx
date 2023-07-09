import { FunctionComponent } from "react";
import Threshold from "./Threshold";
import Target from "./Target";
import { LogicSwitchProps } from "../../types/circuitflow.types";

const LogicSwitch: FunctionComponent<LogicSwitchProps> = ({
  logicType,
  thresholdValue,
  setTargetCondition,
  setThresholdValue,
  targetCondition,
  targetConditionOpen,
  setTargetConditionOpen,
  circuitInformation,
}): JSX.Element => {
  switch (logicType) {
    case "THRESHOLD":
      return (
        <Threshold
          thresholdValue={thresholdValue}
          setThresholdValue={setThresholdValue}
        />
      );
    case "TARGET":
      return (
        <Target
          targetCondition={targetCondition}
          setTargetCondition={setTargetCondition}
          targetConditionOpen={targetConditionOpen}
          setTargetConditionOpen={setTargetConditionOpen}
          circuitInformation={circuitInformation}
        />
      );
    default:
      return <></>;
  }
};

export default LogicSwitch;
