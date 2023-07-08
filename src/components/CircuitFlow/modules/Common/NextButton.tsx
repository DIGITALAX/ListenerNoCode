import { FunctionComponent } from "react";
import { NextButtonProps } from "../../types/circuitflow.types";
import { setCircuitFlow } from "../../../../../redux/reducers/circuitFlowSlice";

const NextButton: FunctionComponent<NextButtonProps> = ({
  text,
  dispatch,
  circuitFlowIndex,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex justify-end">
      <div
        className="relative w-fit h-fit px-2.5 py-2 flex items-end justify-center cursor-pointer hover:opacity-50 hover:bg-moda/40 hover:text-aBlack active:scale-95"
        id="borderLight"
        onClick={() => dispatch(setCircuitFlow(circuitFlowIndex + 1))}
      >
        <div
          className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-moda text-lg"
          id="blur"
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default NextButton;
