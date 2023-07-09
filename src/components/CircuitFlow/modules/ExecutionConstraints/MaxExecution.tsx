import { FunctionComponent } from "react";
import { MaxExecutionProps } from "../../types/circuitflow.types";
import ConditionInput from "../SetConditions/modules/ConditionInput/ConditionInput";

const MaxExecution: FunctionComponent<MaxExecutionProps> = ({
  setMaxLitActionCompletions,
  maxLitActionCompletions,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-72 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
      <ConditionInput
        text={
          "What is the max number of times the circuit can run in total before it is terminated? Leave empty if it should run infinitely."
        }
      />
      <div className="relative w-full h-full gap-1 flex flex-col">
        <div
          className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-sm"
          id="blur"
        >
          No. Of Full Circuit Runs
        </div>
        <input
          value={maxLitActionCompletions || ""}
          placeholder="enter max number"
          className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
          id="borderLight"
          onChange={(e) => setMaxLitActionCompletions(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default MaxExecution;
