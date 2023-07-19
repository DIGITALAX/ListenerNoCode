import { ConditionChoiceProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { FunctionComponent } from "react";

const Choice: FunctionComponent<ConditionChoiceProps> = ({
  setConditionType,
  conditionType,
  editingState,
}): JSX.Element => {
  return (
    <div
      className="relative w-80 h-60 flex flex-col p-2 gap-3 justify-center items-center"
      id="inputBorder"
    >
      <div className="flex flex-col w-full h-full p-1 gap-1.5">
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className={`relative w-full h-16 flex items-center justify-center ${
              !editingState && "cursor-pointer hover:opacity-50 active:scale-95"
            } ${conditionType === "web" ? "bg-white" : "border-ballena border-2"}`}
            id={conditionType === "web" ? "borderLight" : ""}
            onClick={() => !editingState && setConditionType("web")}
          >
            <div
              className={`relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-xl ${
                conditionType === "web" ? "text-black" : "text-ballena"
              }`}
            >
              WEBHOOK CONDITION
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
            className={`relative w-full h-16 flex items-center justify-center ${
              !editingState && "cursor-pointer hover:opacity-50 active:scale-95"
            } ${
              conditionType === "contract" ? "bg-white" : "border-ballena border-2"
            }`}
            id={conditionType === "contract" ? "borderLight" : ""}
            onClick={() => !editingState && setConditionType("contract")}
          >
            <div
              className={`relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-xl ${
                conditionType === "contract" ? "text-black" : "text-ballena"
              }`}
            >
              CONTRACT CONDITION
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choice;
