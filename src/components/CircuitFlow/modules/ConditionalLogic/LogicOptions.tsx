import { FunctionComponent } from "react";
import { LogicOptionsProps } from "@/components/CircuitFlow/types/circuitflow.types";
import ConditionInput from "../SetConditions/modules/ConditionInput/ConditionInput";

const LogicOptions: FunctionComponent<LogicOptionsProps> = ({
  logicType,
  setLogicType,
}): JSX.Element => {
  return (
    <div
      className="relative w-72 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
      <ConditionInput
        text={
          "Does every condition need to pass? A threshold number? Is there a target condition?"
        }
      />
      <div className="flex flex-col w-full h-full border-4 border-moda p-1 gap-1.5">
        {Array.from(["EVERY", "THRESHOLD", "TARGET"]).map(
          (logic: string, index: number) => {
            return (
              <div
                key={index}
                className={`relative w-full h-full flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95
                bg-aBlack/40 ${
                  ((logicType === "EVERY" && index === 0) ||
                    (logicType === "THRESHOLD" && index === 1) ||
                    (logicType === "TARGET" && index === 2)) &&
                  "bg-sol/60"
                }`}
                id="borderLight"
                onClick={() =>
                  setLogicType(
                    index === 0 ? "EVERY" : index === 1 ? "THRESHOLD" : "TARGET"
                  )
                }
              >
                <div
                  className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-moda text-base"
                  id="blur"
                >
                  {logic}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default LogicOptions;
