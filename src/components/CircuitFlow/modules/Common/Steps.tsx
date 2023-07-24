import { FunctionComponent } from "react";
import { StepsProps } from "../../types/circuitflow.types";

const Steps: FunctionComponent<StepsProps> = ({
  stepCount,
  currentFlowIndex,
  increaseStepFunction,
  largeScreen,
}): JSX.Element => {
  return (
    <div
      className="relative w-full h-full flex flex-row md:overflow-x-auto overflow-x-scroll"
      id="xScroll"
    >
      <div className="relative inline-flex flex-row w-fit md:w-auto">
        {Array.from({ length: largeScreen })?.map((_, index: number) => {
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
              onClick={() => increaseStepFunction(index)}
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
