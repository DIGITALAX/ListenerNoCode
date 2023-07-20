import {
  Action,
  ContractAction,
  FetchAction,
} from "@/components/CircuitFlow/types/litlistener.types";
import { FunctionComponent } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { setNewContractActionInformation } from "../../../../../../redux/reducers/newContractActionInformationSlice";
import { setNewFetchActionInformation } from "../../../../../../redux/reducers/newFetchActionInformationSlice";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import { AllActionsProps } from "../../../types/circuitflow.types";
import { setActionFlow } from "../../../../../../redux/reducers/actionFlowSlice";

const AllActions: FunctionComponent<AllActionsProps> = ({
  circuitInformation,
  dispatch,
  setActionType,
  setEditingStateAction,
  actionFlowIndex
}): JSX.Element => {
  return (
    <div
      className="relative w-full h-fit overflow-y-hidden py-4 overflow-x-scroll flex items-center justify-start"
      id="xScroll"
    >
      <div className="relative flex flex-row gap-2 w-fit h-fit">
        {circuitInformation?.actions?.map((action: Action, index: number) => {
          return (
            <div key={index} className="relative w-fit h-fit flex">
              <div
                className="relative w-24 flex justify-center items-center text-center font-vcr h-full text-sm text-white cursor-pointer active:scale-95 hover:opacity-80 bg-aBlack border border-white"
                onClick={() => {
                  (action as ContractAction)?.chainId
                    ? dispatch(
                        setNewContractActionInformation(
                          action as ContractAction
                        )
                      )
                    : dispatch(
                        setNewFetchActionInformation(action as FetchAction)
                      );
                      dispatch(
                        setActionFlow({
                          index: 1,
                          fetchCount: actionFlowIndex.fetchCount,
                          contractCount: actionFlowIndex.contractCount,
                        })
                      );
                  (action as ContractAction)?.chainId
                    ? setActionType("contract")
                    : setActionType("fetch");
                  setEditingStateAction(true);
                }}
              >
                <div
                  id="blur"
                  className="relative w-fit h-fit flex items-center justify-center"
                >
                  {(action as ContractAction)?.chainId ? "CONTRACT" : "API"}
                </div>
              </div>
              <div
                className="absolute w-fit h-fit -top-2 -right-2 cursor-pointer z-1 hover:mix-blend-multiply"
                id="blur"
                onClick={() => {
                  const newActions = [...circuitInformation.actions];
                  newActions.splice(index, 1);
                  dispatch(
                    setCircuitInformation({
                      ...circuitInformation,
                      actions: newActions,
                    })
                  );
                }}
              >
                <RiCloseCircleFill color="#8EADB5" size={20} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllActions;
