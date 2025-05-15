import { FunctionComponent, useContext } from "react";
import {
  AllCircuits as AllCircuitsType,
  AllCircuitsProps,
  Order,
} from "../types/account.types";
import { convertDate } from "../../../../lib/helpers/convertDate";

import {
  PiArrowCircleUpLeftFill,
  PiArrowCircleDownRightFill,
} from "react-icons/pi";
import { ModalContext } from "@/pages/_app";

const AllCircuits: FunctionComponent<AllCircuitsProps> = ({
  circuitsOpen,
  setCircuitsOpen,
  largeScreen,
}): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <div
      className={`absolute z-20 right-0 top-0 grow border-l-2 border-sol bg-aBlack px-3 xl:px-4 py-6 items-center justify-center h-full ${
        circuitsOpen ? (largeScreen ? "w-72" : "w-11/12") : "w-10"
      }`}
    >
      <div
        className="absolute top-10 -left-4 flex opacity-80 cursor-pointer w-fit h-fit z-5 border border-ballena rounded-full bg-white"
        onClick={() => setCircuitsOpen(!circuitsOpen)}
      >
        {circuitsOpen ? (
          <PiArrowCircleDownRightFill size={30} color="#FFD85F" />
        ) : (
          <PiArrowCircleUpLeftFill size={30} color="#FFD85F" />
        )}
      </div>
      <div
        className={`${circuitsOpen ? "flex" : "hidden"}
         flex-row items-center justify-center relative w-full h-full xl:border-x-0 border-x-4 border-moda`}
      >
        <div className="relative w-1 h-full bg-moda xl:flex hidden"></div>
        <div className="relative w-full h-full flex flex-col gap-5">
          <div className="relative w-full h-fit flex flex-row items-start justify-center">
            <div className="relative h-1 w-10 bg-moda flex items-start justify-center"></div>
            <div
              className="relative h-3 w-4 flex items-center justify-center -top-0.5"
              id="boxGrad"
            ></div>
            <div
              className="uppercase text-xl font-vcr text-moda px-1 flex items-start whitespace-nowrap justify-center w-fit h-fit -top-2"
              id="blur"
            >
              {!context?.switchAccount ? "All Circuits" : "All Orders"}
            </div>
            <div
              className="relative h-3 w-4 flex items-center justify-center -top-0.5"
              id="boxGrad"
            ></div>
            <div className="relative h-1 w-full bg-moda flex items-center justify-center"></div>
          </div>
          <div className="relative w-full h-full gap-3 font-vcr px-2 items-center overflow-y-scroll">
            <div className="justify-start h-fit items-center gap-3 w-full flex flex-col break-words">
              {(!context?.switchAccount
                ? context?.allUserCircuits
                : context?.allOrders
              )?.map((value: AllCircuitsType | Order, index: number) => {
                let completed: boolean;
                if (!context?.switchAccount) {
                  completed =
                    (value as AllCircuitsType)?.completed ||
                    (value as AllCircuitsType).monitorExecutions ===
                      JSON.parse(
                        JSON.parse(
                          (value as AllCircuitsType).circuitInformation
                            ?.information as any
                        )?.executionConstraints
                      )?.conditionMonitorExecutions ||
                    (value as AllCircuitsType).circuitExecutions ===
                      JSON.parse(
                        JSON.parse(
                          (value as AllCircuitsType).circuitInformation
                            ?.information as any
                        )?.executionConstraints
                      )?.maxLitActionCompletions;
                }

                const reverseIndex = !context?.switchAccount
                  ? Number(context?.allUserCircuits?.length) - index
                  : Number(context?.allOrders?.length) - index;

                return (
                  <div
                    key={index}
                    className={`relative w-fit xl:w-full h-fit flex flex-row justify-center items-center gap-3 cursor-pointer active:scale-95 hover:text-sol active:text-sol grow text-center 
                  ${
                    (
                      !context?.switchAccount
                        ? (value as AllCircuitsType)?.circuitInformation?.id ===
                          context?.circuitSideBar
                        : (value as Order)?.orderId ===
                          context?.selectedOrderSidebar?.orderId
                    )
                      ? "text-sol"
                      : "text-white"
                  }  `}
                    onClick={() =>
                      !context?.switchAccount
                        ? context?.setCircuitSideBar(
                            (value as AllCircuitsType)?.circuitInformation?.id
                          )
                        : context?.setSelectedOrderSidebar(value as Order)
                    }
                  >
                    <div className="relative flex flex-col relative w-full h-fit justify-start items-center">
                      <div
                        className="flex relative w-full h-fit uppercase items-center justify-center text-sm flex-row gap-1"
                        id="blur"
                      >
                        <div className="relative w-fit h-fit flex items-center justify-start">
                          {!context?.switchAccount ? "Circuit" : "Order"}{" "}
                          {reverseIndex}:
                        </div>
                        <div
                          className={`relative w-fit h-fit flex items-center justify-start ${
                            !context?.switchAccount
                              ? (value as AllCircuitsType)?.interrupted
                                ? "text-costa"
                                : completed!
                                ? "text-comp"
                                : "text-run"
                              : (value as Order)?.isFulfilled
                              ? "text-comp"
                              : "text-run"
                          }`}
                        >
                          {!context?.switchAccount
                            ? (value as AllCircuitsType)?.interrupted
                              ? `(interrupted)`
                              : completed!
                              ? `(completed)`
                              : `(running)`
                            : (value as Order)?.isFulfilled
                            ? "(fulfilled)"
                            : "(ordered)"}
                        </div>
                      </div>
                      <div
                        className="flex relative w-full h-fit uppercase items-center justify-center text-xs"
                        id="blur"
                      >
                        {convertDate(value?.blockTimestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative h-1 w-full bg-moda flex items-start justify-center"></div>
        </div>
        <div className="relative w-1 h-full bg-moda xl:flex hidden"></div>
      </div>
    </div>
  );
};

export default AllCircuits;
