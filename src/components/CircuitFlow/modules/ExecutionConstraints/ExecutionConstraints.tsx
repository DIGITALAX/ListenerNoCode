import { FunctionComponent } from "react";
import { ExecutionConstraintsProps } from "../../types/circuitflow.types";
import EndStart from "./EndStart";
import MaxConditions from "./MaxConditions";
import MaxExecution from "./MaxExecution";

const ExecutionConstraints: FunctionComponent<ExecutionConstraintsProps> = ({
  time,
  setConditionMonitorExecutions,
  setMaxLitActionCompletions,
  setTime,
  conditionMonitorExecutions,
  maxLitActionCompletions,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <EndStart time={time} setTime={setTime} />

        <MaxConditions
          conditionMonitorExecutions={conditionMonitorExecutions}
          setConditionMonitorExecutions={setConditionMonitorExecutions}
        />

        <MaxExecution
          maxLitActionCompletions={maxLitActionCompletions}
          setMaxLitActionCompletions={setMaxLitActionCompletions}
        />
      </div>
    </div>
  );
};
export default ExecutionConstraints;
