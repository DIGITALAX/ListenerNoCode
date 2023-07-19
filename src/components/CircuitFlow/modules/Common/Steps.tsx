import { FunctionComponent } from "react";
import { StepsProps } from "../../types/circuitflow.types";
import { setConditionFlow } from "../../../../../redux/reducers/conditionFlowSlice";

const Steps: FunctionComponent<StepsProps> = ({
  stepCount,
  dispatch,
  circuitFlowIndex,
  currentFlowIndex,
}): JSX.Element => {
  return (
    <div className="relative w-full h-16 flex flex-row">
      <div className="relative inline-flex flex-row">
        {Array.from({ length: 10 }).map((_, index: number) => {
          return (
            <div
              key={index}
              className={`relative w-16 h-full border border-ballena font-vcr text-lg flex items-center justify-center ${
                index < stepCount && "cursor-pointer hover:opacity-80"
              } ${
                currentFlowIndex.index === index
                  ? "text-black bg-white"
                  : "text-ballena"
              }`}
              onClick={() => {
                circuitFlowIndex === 0 &&
                  index < stepCount &&
                  dispatch(
                    setConditionFlow({
                      index: index,
                      webhookCount: currentFlowIndex.webhookCount,
                      contractCount: currentFlowIndex.contractCount,
                    })
                  );
              }}
            >
              {index > stepCount - 1 ? "x" : index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Steps;
