import { FunctionComponent } from "react";
import ConditionInput from "./ConditionInput";
import { ConditionTypeProps } from "@/components/CircuitFlow/types/circuitflow.types";

const ConditionType: FunctionComponent<ConditionTypeProps> = ({
  setConditionType,
  conditionType,
  editingState,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
      <ConditionInput
        text={"Choose from a condition type. Contract or Webhook Condition?"}
      />
      <div className="flex flex-col w-full h-full border-4 border-moda p-1 gap-1.5">
        {Array.from(["WEBHOOK CONDITION", "CONTRACT CONDITION"]).map(
          (name: string, index: number) => {
            return (
              <div
                key={index}
                className={`relative w-full h-full flex items-center justify-center ${
                  !editingState &&
                  "cursor-pointer hover:opacity-50 active:scale-95"
                } bg-aBlack/40 ${
                  ((conditionType === "web" && index === 0) ||
                    (conditionType === "contract" && index === 1)) &&
                  "bg-sol/60"
                }`}
                id="borderLight"
                onClick={() =>
                  !editingState &&
                  setConditionType(index === 0 ? "web" : "contract")
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

export default ConditionType;
