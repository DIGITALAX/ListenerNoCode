import { FunctionComponent } from "react";
import { TargetProps } from "../../types/circuitflow.types";
import ConditionInput from "../SetConditions/modules/ConditionInput/ConditionInput";
import { Condition, ContractCondition } from "../../types/litlistener.types";

const Target: FunctionComponent<TargetProps> = ({
  targetCondition,
  setTargetCondition,
  targetConditionOpen,
  setTargetConditionOpen,
  circuitInformation,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
      <ConditionInput
        text={"What's the target condition that must pass each interval?"}
      />
      <div className="relative w-full h-full flex flex-col gap-1">
        <div className="relative w-fit h-fit flex text-sol font-vcr" id="blur">
          Target Condition
        </div>
        <div
          className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
          id="borderLight"
          onClick={() => setTargetConditionOpen(!targetConditionOpen)}
        >
          {`${
            (
              circuitInformation?.conditions[
                targetCondition - 1
              ] as ContractCondition
            )?.chainId
              ? "Contract Condition"
              : "Webhook Condition"
          } ${targetCondition}`}
        </div>
        {targetConditionOpen && (
          <div className="z-10 absolute w-full h-fit flex flex-col bg-aBlack -top-2">
            {circuitInformation?.conditions.map(
              (condition: Condition, index: number) => {
                return (
                  <div
                    key={index}
                    className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                    id="borderLight"
                    onClick={() => {
                      setTargetConditionOpen(!targetConditionOpen);
                      setTargetCondition(index + 1);
                    }}
                  >
                    {`${
                      (condition as ContractCondition)?.chainId
                        ? "Contract Condition"
                        : "Webhook Condition"
                    } ${index + 1}`}
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Target;
