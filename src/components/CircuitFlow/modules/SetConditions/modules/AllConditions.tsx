import { AllConditionsProps } from "@/components/CircuitFlow/types/circuitflow.types";
import {
  Condition,
  ContractCondition,
  WebhookCondition,
} from "@/components/CircuitFlow/types/litlistener.types";
import { FunctionComponent } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import { setNewWebhookConditionInformation } from "../../../../../../redux/reducers/newWebhookConditionInformationSlice";
import { setNewContractConditionInformation } from "../../../../../../redux/reducers/newContractConditionInformationSlice";
import { setConditionFlow } from "../../../../../../redux/reducers/conditionFlowSlice";

const AllConditions: FunctionComponent<AllConditionsProps> = ({
  circuitInformation,
  dispatch,
  setConditionType,
  setEditingState,
  conditionFlowIndex,
}): JSX.Element => {
  return (
    <div
      className="relative w-full h-fit overflow-y-hidden py-4 overflow-x-scroll flex items-center justify-start"
      id="xScroll"
    >
      <div className="relative flex flex-row gap-2 w-fit h-fit">
        {circuitInformation?.conditions?.map(
          (condition: Condition, index: number) => {
            return (
              <div key={index} className="relative w-fit h-fit flex">
                <div
                  className="relative w-24 flex justify-center items-center text-center font-vcr h-full text-sm text-white cursor-pointer active:scale-95 hover:opacity-80 bg-aBlack border border-white"
                  onClick={() => {
                    (condition as ContractCondition)?.chainId
                      ? dispatch(
                          setNewContractConditionInformation(
                            condition as ContractCondition
                          )
                        )
                      : dispatch(
                          setNewWebhookConditionInformation(
                            condition as WebhookCondition
                          )
                        );
                    dispatch(
                      setConditionFlow({
                        index: 1,
                        webhookCount: conditionFlowIndex.webhookCount,
                        contractCount: conditionFlowIndex.contractCount,
                      })
                    );
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
                    const newConditions = [...circuitInformation.conditions];
                    newConditions.splice(index, 1);
                    dispatch(setNewContractConditionInformation(undefined));
                    dispatch(setNewWebhookConditionInformation(undefined));
                    setEditingState(false);
                    dispatch(
                      setCircuitInformation({
                        ...circuitInformation,
                        conditions: newConditions,
                      })
                    );
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
