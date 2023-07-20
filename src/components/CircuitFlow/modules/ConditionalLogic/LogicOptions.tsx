import { FunctionComponent } from "react";
import { LogicOptionsProps } from "@/components/CircuitFlow/types/circuitflow.types";

const LogicOptions: FunctionComponent<LogicOptionsProps> = ({
  logicType,
  setLogicType,
}): JSX.Element => {
  return (
    <div
      className="relative w-80 h-60 flex flex-col p-2 gap-3 justify-center items-center"
      id="inputBorder"
    >
      <div className="flex flex-col w-full h-full p-1 gap-1.5">
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className={`relative w-full h-10 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95 ${
              logicType === "EVERY" ? "bg-white" : "border-ballena border-2"
            }`}
            id={logicType === "EVERY" ? "borderLight" : ""}
            onClick={() => setLogicType("EVERY")}
          >
            <div
              className={`relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-base ${
                logicType === "EVERY" ? "text-black" : "text-ballena"
              }`}
            >
              EVERY
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit font-vcr text-ballena text-xl items-center justify-center text-center flex flex-col">
          <div className="relative w-fit h-fit items-center justify-center">
            -or-
          </div>
        </div>
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className={`relative w-full h-10 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95 ${
              logicType === "THRESHOLD" ? "bg-white" : "border-ballena border-2"
            }`}
            id={logicType === "THRESHOLD" ? "borderLight" : ""}
            onClick={() => setLogicType("THRESHOLD")}
          >
            <div
              className={`relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-base ${
                logicType === "THRESHOLD" ? "text-black" : "text-ballena"
              }`}
            >
              THRESHOLD CONDITION
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit font-vcr text-ballena text-xl items-center justify-center text-center flex flex-col">
          <div className="relative w-fit h-fit items-center justify-center">
            -or-
          </div>
        </div>
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className={`relative w-full h-10 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95 ${
              logicType === "TARGET" ? "bg-white" : "border-ballena border-2"
            }`}
            id={logicType === "TARGET" ? "borderLight" : ""}
            onClick={() => setLogicType("TARGET")}
          >
            <div
              className={`relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-base ${
                logicType === "TARGET" ? "text-black" : "text-ballena"
              }`}
            >
              TARGET CONDITION
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogicOptions;
