import { FunctionComponent, useContext } from "react";
import { ImCross } from "react-icons/im";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  Condition,
  ContractCondition,
} from "../CircuitFlow/types/litlistener.types";
import { ModalContext } from "@/pages/_app";

const PreviewCondition: FunctionComponent = (): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <div className="inset-0 justify-center fixed z-20 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto">
      <div className="relative w-full lg:w-[50vw] h-fit col-start-1 place-self-center bg-black">
        <div className="relative w-full row-start-2 h-fit grid grid-flow-col auto-cols-auto">
          <div className="relative w-full h-full col-start-1 place-self-center">
            <div className="relative w-full h-full grid grid-flow-row auto-rows-auto gap-4 pb-8">
              <div
                className="relative w-fit h-fit row-start-1 self-center justify-self-end pr-3 pt-3 cursor-pointer"
                id="blur"
              >
                <ImCross
                  color="white"
                  size={15}
                  onClick={() =>
                    context?.setPreviewCondition({
                      open: false,
                      message: "",
              
                    })
                  }
                />
              </div>
              <div className="relative w-full h-fit flex flex-col items-center justify-center px-4 gap-6">
                <div
                  className="relative w-3/4 h-fit justify-center items-center text-white font-vcr text-base break-words text-center"
                  id="blur"
                >
                  {context?.previewCondition?.message}
                </div>
                <div
                  className="relative w-full h-fit overflow-y-hidden py-4 overflow-x-scroll flex items-center justify-start"
                  id="xScroll"
                >
                  <div className="relative flex flex-row gap-2 w-fit h-fit">
                    {context?.circuitInformation?.conditions?.map(
                      (condition: Condition, index: number) => {
                        return (
                          <div
                            key={index}
                            className="relative w-fit h-fit flex"
                          >
                            <div
                              className="relative w-24 flex justify-center items-center text-center font-vcr py-1.5 h-full text-sm text-white cursor-pointer active:scale-95 hover:opacity-80 bg-aBlack"
                              id="footerBG"
                              onClick={() => {
                                // (condition as ContractCondition)?.chainId
                                //   ? setNewContractConditionInformation(
                                //       condition as ContractCondition
                                //     )
                                //   : setNewWebhookConditionInformation(
                                //       condition as WebhookCondition
                                //     );
                                // (condition as ContractCondition)?.chainId
                                //   ? setConditionType("contract")
                                //   : setConditionType("web");
                                // setEditingState(true);
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
                              // onClick={() => {
                              //   const newConditions = [
                              //     ...circuitInformation.conditions,
                              //   ];
                              //   newConditions.splice(index, 1);
                              //   dispatch(
                              //     setCircuitInformation({
                              //       ...circuitInformation,
                              //       conditions: newConditions,
                              //     })
                              //   );
                              // }}
                            >
                              <RiCloseCircleFill color="#8EADB5" size={20} />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCondition;
