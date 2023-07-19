import { FunctionComponent } from "react";
import { ThresholdProps } from "../../types/circuitflow.types";

const Threshold: FunctionComponent<ThresholdProps> = ({
  thresholdValue,
  setThresholdValue,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
  
      <div className="relative w-full h-full gap-1 flex flex-col">
        <div
          className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-sm"
          id="blur"
        >
          Threshold
        </div>
        <input
          value={thresholdValue || ""}
          placeholder="enter threshold number"
          className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
          id="borderLight"
          onChange={(e) => setThresholdValue(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Threshold;
