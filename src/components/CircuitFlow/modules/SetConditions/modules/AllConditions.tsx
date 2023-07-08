import { AllConditionsProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { Condition } from "@/components/CircuitFlow/types/litlistener.types";
import { FunctionComponent } from "react";

const AllConditions: FunctionComponent<AllConditionsProps> = ({
  circuitInformation,
}): JSX.Element => {
  return (
    <div className="relative w-full h-10 py-2 overflow-x-scroll flex">
      <div className="relative flex flex-row gap-2 w-fit h-fit">
        {circuitInformation?.conditions?.map(
          (condition: Condition, index: number) => {
            return (
              <div
                key={index}
                className="relative w-10 h-full rounded-md"
                id="redBorder"
              >
                
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default AllConditions;
