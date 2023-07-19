import { FunctionComponent } from "react";
import { ActionTypeProps } from "@/components/CircuitFlow/types/circuitflow.types";

const ActionType: FunctionComponent<ActionTypeProps> = ({
  setActionType,
  actionType,
  editingStateAction,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
    
      <div className="flex flex-col w-full h-full border-4 border-moda p-1 gap-1.5">
        {Array.from(["FETCH ACTION", "CONTRACT ACTION"]).map(
          (name: string, index: number) => {
            return (
              <div
                key={index}
                className={`relative w-full h-full flex items-center justify-center ${
                  !editingStateAction &&
                  "cursor-pointer hover:opacity-50 active:scale-95"
                } bg-aBlack/40 ${
                  ((actionType === "fetch" && index === 0) ||
                    (actionType === "contract" && index === 1)) &&
                  "bg-sol/60"
                }`}
                id="borderLight"
                onClick={() =>
                  !editingStateAction &&
                  setActionType(index === 0 ? "fetch" : "contract")
                }
              >
                <div
                  className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-moda text-base"
                  id="blur"
                >
                  {name}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default ActionType;
