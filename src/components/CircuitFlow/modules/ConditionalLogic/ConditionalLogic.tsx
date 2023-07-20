import { FunctionComponent } from "react";
import LogicOptions from "./LogicOptions";
import { ConditionalLogicProps } from "../../types/circuitflow.types";
import Input from "./Input";
import DropDown from "./DropDown";

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
  conditionLogicFlowIndex,
}): JSX.Element => {
  switch (logicType) {
    case "TARGET":
      switch (conditionLogicFlowIndex.index) {
        case 2:
          return (
            <DropDown
              setDropDownOpen={() =>
                setTargetConditionOpen(!targetConditionOpen)
              }
              inputChosen={targetCondition}
              dropDownOpen={targetConditionOpen}
              title={"Target"}
              circuitInformation={circuitInformation}
              setDropDownOpenIndex={(index: number) => {
                setTargetConditionOpen(!targetConditionOpen);
                setTargetCondition(index + 1);
              }}
            />
          );

        case 1:
          return (
            <Input
              valueCondition={interval || 120000}
              setCondition={(e: number) => setInterval(e)}
              placeholderText={"enter interval"}
              mainText={"Interval"}
            />
          );

        default:
          return (
            <LogicOptions logicType={logicType} setLogicType={setLogicType} />
          );
      }

    case "THRESHOLD":
      switch (conditionLogicFlowIndex.index) {
        case 2:
          return (
            <Input
              setCondition={(e: number) => setThresholdValue(e)}
              valueCondition={thresholdValue || 1}
              placeholderText={"enter threshold amount"}
              mainText={"Threshold"}
            />
          );

        case 1:
          return (
            <Input
              setCondition={(e: number) => setInterval(e)}
              valueCondition={interval || 120000}
              placeholderText={"enter interval"}
              mainText={"Interval"}
            />
          );

        default:
          return (
            <LogicOptions logicType={logicType} setLogicType={setLogicType} />
          );
      }

    default:
      switch (conditionLogicFlowIndex.index) {
        case 1:
          return (
            <Input
              setCondition={(e: number) => setInterval(e)}
              valueCondition={interval || 120000}
              placeholderText={"enter interval"}
              mainText={"Interval"}
            />
          );

        default:
          return (
            <LogicOptions logicType={logicType} setLogicType={setLogicType} />
          );
      }
  }
};

export default ConditionalLogic;
