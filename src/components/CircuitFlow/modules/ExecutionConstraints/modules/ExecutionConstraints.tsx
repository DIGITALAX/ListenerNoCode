import { FunctionComponent } from "react";
import Start from "./Start";
import End from "./End";
import { ExecutionConstraintsProps } from "@/components/CircuitFlow/types/circuitflow.types";
import Input from "../../Common/Input";

const ExecutionConstraints: FunctionComponent<ExecutionConstraintsProps> = ({
  time,
  setConditionMonitorExecutions,
  setMaxLitActionCompletions,
  setTime,
  conditionMonitorExecutions,
  maxLitActionCompletions,
  executionConstraintFlowIndex,
}): JSX.Element => {
  switch (executionConstraintFlowIndex.index) {
    case 3:
      return (
        <Input
          changedValue={[String(maxLitActionCompletions || "")]}
          count={1}
          text={["No. Of Full Circuit Runs"]}
          placeholderText={["enter max number"]}
          onChangeFunction={[
            (value) => setMaxLitActionCompletions(Number(value)),
          ]}
        />
      );

    case 2:
      return (
        <Input
          changedValue={[String(conditionMonitorExecutions || "")]}
          count={1}
          text={["No. Of Conditions Monitor Executions"]}
          placeholderText={["enter max number"]}
          onChangeFunction={[
            (value) => setConditionMonitorExecutions(Number(value)),
          ]}
        />
      );

    case 1:
      return <End time={time} setTime={setTime} />;

    default:
      return <Start time={time} setTime={setTime} />;
  }
};
export default ExecutionConstraints;
