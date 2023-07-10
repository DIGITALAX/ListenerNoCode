import { InputProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { FunctionComponent } from "react";

const Output: FunctionComponent<InputProps> = ({
  text,
}): JSX.Element => {
  return (
    <div className="flex flex-row w-full h-full border-b-4 border-moda">
      <div className="relative w-1 h-full bg-moda"></div>
      <div className="relative flex items-center justify-center flex flex-col w-full h-full">
        <div className="relative w-full h-fit flex flex-row items-start justify-center">
          <div className="relative h-1 w-10 bg-moda flex items-start justify-center"></div>
          <div
            className="relative h-3 w-4 flex items-center justify-center -top-0.5"
            id="boxGrad"
          ></div>
          <div
            className="uppercase text-xl font-vcr text-moda px-1 flex items-start justify-center w-fit h-fit -top-2"
            id="blur"
          >
            output
          </div>
          <div
            className="relative h-3 w-4 flex items-center justify-center -top-0.5"
            id="boxGrad"
          ></div>
          <div className="relative h-1 w-full bg-moda flex items-center justify-centerflex items-start justify-center"></div>
          <div className="relative h-1 w-full bg-moda flex items-start justify-center"></div>
        </div>
        <div
          className="relative w-full h-full flex text-sm text-center justify-center font-vcr text-white px-1 pb-1"
          id="blur"
        >
          {text}
        </div>
      </div>
      <div className="relative w-1 h-full bg-moda"></div>
    </div>
  );
};

export default Output;
