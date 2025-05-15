import {
  Action,
  ContractAction,
  FetchAction,
} from "@/components/CircuitFlow/types/litlistener.types";
import { FunctionComponent, useContext } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { ModalContext } from "@/pages/_app";
import { AllActionsProps } from "@/components/CircuitFlow/types/circuitflow.types";

const AllActions: FunctionComponent<AllActionsProps> = ({
  setActionType,
  setEditingStateAction,
}): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <div
      className="relative w-full h-fit overflow-y-hidden py-4 overflow-x-scroll flex items-center justify-start"
      id="xScroll"
    >
      <div className="relative flex flex-row gap-2 w-fit h-fit">
        {context?.circuitInformation?.actions?.map(
          (action: Action, index: number) => {
            return (
              <div key={index} className="relative w-fit h-fit flex">
                <div
                  className="relative w-24 flex justify-center items-center text-center font-vcr h-full text-sm text-white cursor-pointer active:scale-95 hover:opacity-80 bg-aBlack border border-white"
                  onClick={() => {
                    (action as ContractAction)?.chainId
                      ? context?.setNewContractActionInfo(
                          action as ContractAction
                        )
                      : context?.setNewFetchActionInfo(action as FetchAction);

                    context?.setActionFlow((prev) => ({
                      ...prev,
                      index: 1,
                    }));

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
                    const newActions = [
                      ...context?.circuitInformation?.actions,
                      context?.newFetchActionInfo!,
                      context?.newContractActionInfo!,
                    ];
                    newActions.splice(index, 1);
                    setEditingStateAction(false);
                    context?.setNewContractActionInfo(undefined);
                    context?.setNewFetchActionInfo(undefined);

                    context?.setCircuitInformation((prev) => ({
                      ...prev,
                      actions: newActions,
                    }));
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

export default AllActions;
