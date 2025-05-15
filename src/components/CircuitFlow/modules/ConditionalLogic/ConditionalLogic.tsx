import { FunctionComponent, useContext } from "react";
import LogicOptions from "./LogicOptions";
import Input from "./Input";
import DropDown from "./DropDown";
import { ConditionalLogicProps } from "../../types/circuitflow.types";
import { ModalContext } from "@/pages/_app";

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
}): JSX.Element => {
  const context = useContext(ModalContext);
  switch (logicType) {
    case "TARGET":
      switch (context?.conditionLogicFlow.index) {
        case 2:
          return (
            <DropDown
              setDropDownOpen={() =>
                setTargetConditionOpen(!targetConditionOpen)
              }
              inputChosen={targetCondition}
              dropDownOpen={targetConditionOpen}
              title={"Target"}
              setDropDownOpenIndex={(index: number) => {
                setTargetConditionOpen(!targetConditionOpen);
                setTargetCondition(index + 1);
              }}
            />
          );

        case 1:
          return (
            <Input
              valueCondition={interval || 180000000}
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
      switch (context?.conditionLogicFlow?.index) {
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
              valueCondition={interval || 180000000}
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
      switch (context?.conditionLogicFlow?.index) {
        case 1:
          return (
            <Input
              setCondition={(e: number) => setInterval(e)}
              valueCondition={interval || 180000000}
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
