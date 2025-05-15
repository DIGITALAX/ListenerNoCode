import { AllConditionsProps } from "@/components/CircuitFlow/types/circuitflow.types";
import {
  Condition,
  ContractCondition,
  WebhookCondition,
} from "@/components/CircuitFlow/types/litlistener.types";
import { ModalContext } from "@/pages/_app";
import { FunctionComponent, useContext } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

const AllConditions: FunctionComponent<AllConditionsProps> = ({
  setConditionType,
  setEditingState,
}): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <div
      className="relative w-full h-fit overflow-y-hidden py-4 overflow-x-scroll flex items-center justify-start"
      id="xScroll"
    >
      <div className="relative flex flex-row gap-2 w-fit h-fit">
        {context?.circuitInformation?.conditions?.map(
          (condition: Condition, index: number) => {
            return (
              <div key={index} className="relative w-fit h-fit flex">
                <div
                  className="relative w-24 flex justify-center items-center text-center font-vcr h-full text-sm text-white cursor-pointer active:scale-95 hover:opacity-80 bg-aBlack border border-white"
                  onClick={() => {
                    (condition as ContractCondition)?.chainId
                      ? context?.setNewContractConditionInfo(
                          condition as ContractCondition
                        )
                      : context?.setNewWebhookConditionInfo(
                          condition as WebhookCondition
                        );

                    context?.setConditionFlow((prev) => ({
                      ...prev,
                      index: 1,
                    }));

                    (condition as ContractCondition)?.chainId
                      ? setConditionType("contract")
                      : setConditionType("web");
                    setEditingState(true);
                  }}
                >
                  <div
                    id="blur"
                    className="relative w-fit h-fit flex items-center justify-center"
                  >
                    {(condition as ContractCondition)?.chainId
                      ? "CONTRACT"
                      : "WEBHOOK"}
                  </div>
                </div>
                <div
                  className="absolute w-fit h-fit -top-2 -right-2 cursor-pointer z-1 hover:mix-blend-multiply"
                  id="blur"
                  onClick={() => {
                    const newConditions = [
                      ...context?.circuitInformation?.conditions,
                      context?.newContractConditionInfo!,
                      context?.newWebhookConditionInfo!,
                    ]?.filter(Boolean);
                    newConditions.splice(index, 1);
                    context?.setNewContractConditionInfo(undefined);
                    context?.setNewWebhookConditionInfo(undefined);
                    setEditingState(false);
                    context?.setCircuitInformation((prev) => ({
                      ...prev,
                      conditions: newConditions,
                    }));
                  }}
                >
                  <RiCloseCircleFill color="white" size={20} />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default AllConditions;
