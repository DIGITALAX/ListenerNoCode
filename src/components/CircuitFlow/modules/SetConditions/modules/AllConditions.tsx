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

const AllConditions: FunctionComponent<AllConditionsProps> = ({
  circuitInformation,
  dispatch,
  setConditionType,
  setEditingState,
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
                  className="relative w-24 flex justify-center items-center text-center font-vcr py-1.5 h-full text-sm text-white cursor-pointer active:scale-95 hover:opacity-80 bg-aBlack"
                  id="footerBG"
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
                    dispatch(
                      setCircuitInformation({
                        ...circuitInformation,
                        conditions: newConditions,
                      })
                    );
                  }}
                >
                  <RiCloseCircleFill color="#8EADB5" size={20} />
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
