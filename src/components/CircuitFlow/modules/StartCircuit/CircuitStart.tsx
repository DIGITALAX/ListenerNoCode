import { FunctionComponent } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { CircuitStartProps } from "../../types/circuitflow.types";

const CircuitStart: FunctionComponent<CircuitStartProps> = ({
  handleRunCircuit,
  circuitRunLoading,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-40 flex flex-col p-2 gap-3 justify-center items-center"
      id="inputBorder"
    >
      <div
        className={`relative w-36 px-1.5 h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer uppercase border border-white`}
        onClick={() => handleRunCircuit()}
      >
        <div
          className={`relative w-fit h-fit items-center justify-center flex  ${
            circuitRunLoading && "animate-spin"
          }`}
        >
          {circuitRunLoading ? (
            <AiOutlineLoading size={15} color="white" opacity={80} />
          ) : (
            "run circuit"
          )}
        </div>
      </div>
    </div>
  );
};

export default CircuitStart;
