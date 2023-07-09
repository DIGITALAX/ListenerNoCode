import { FunctionComponent } from "react";
import { MaxConditionsProps } from "../../types/circuitflow.types";
import ConditionInput from "../SetConditions/modules/ConditionInput/ConditionInput";

const MaxConditions: FunctionComponent<MaxConditionsProps> = ({
  conditionMonitorExecutions,
  setConditionMonitorExecutions,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-72 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
      <ConditionInput
        text={
          "What is the max number of times your conditions can be checked before the circuit terminates? Leave empty if it should run infinitely."
        }
      />
      <div className="relative w-full h-full gap-1 flex flex-col">
        <div
          className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-sm"
          id="blur"
        >
          No. Of Conditions Monitor Executions
        </div>
        <input
          value={conditionMonitorExecutions || ""}
          placeholder="enter max number"
          className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
          id="borderLight"
          onChange={(e) =>
            setConditionMonitorExecutions(Number(e.target.value))
          }
        />
      </div>
    </div>
  );
};

export default MaxConditions;
