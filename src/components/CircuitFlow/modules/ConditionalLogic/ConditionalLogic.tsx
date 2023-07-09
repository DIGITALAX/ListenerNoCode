import { FunctionComponent } from "react";
import Connector from "../Common/Connector";
import LogicOptions from "./LogicOptions";
import { ConditionalLogicProps } from "../../types/circuitflow.types";
import Interval from "./Interval";
import LogicSwitch from "./LogicSwitch";
import ConnectorRect from "../Common/ConnectorRect";

const ConditionalLogic: FunctionComponent<ConditionalLogicProps> = ({
  logicType,
  setLogicType,
  thresholdValue,
  setThresholdValue,
  targetCondition,
  setTargetCondition,
  interval,
  setInterval,
  targetConditionOpen,
  setTargetConditionOpen,
  circuitInformation,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <LogicOptions logicType={logicType} setLogicType={setLogicType} />
        <Connector topOnly />
        <Interval interval={interval} setInterval={setInterval} />
        <Connector topOnly />
        <LogicSwitch
          thresholdValue={thresholdValue}
          setThresholdValue={setThresholdValue}
          targetCondition={targetCondition}
          setTargetCondition={setTargetCondition}
          logicType={logicType}
          targetConditionOpen={targetConditionOpen}
          setTargetConditionOpen={setTargetConditionOpen}
          circuitInformation={circuitInformation}
        />
        <ConnectorRect />
      </div>
    </div>
  );
};

export default ConditionalLogic;
