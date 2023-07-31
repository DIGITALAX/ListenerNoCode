import { FunctionComponent } from "react";
import { AllCircuits, AllCircuitsProps, Order } from "../types/account.types";
import { convertDate } from "../../../../lib/helpers/convertDate";
import { setSelectedUserCircuitSideBar } from "../../../../redux/reducers/selectedCircuitSideBarSlice";
import {
  PiArrowCircleUpLeftFill,
  PiArrowCircleDownRightFill,
} from "react-icons/pi";
import { setSelectedOrderSideBar } from "../../../../redux/reducers/selectedOrderSideBarSlice";

const AllCircuits: FunctionComponent<AllCircuitsProps> = ({
  allUserCircuits,
  selectedCircuitSideBar,
  dispatch,
  circuitsOpen,
  setCircuitsOpen,
  largeScreen,
  switchAccount,
  allOrders,
  selectedOrderSideBar,
}): JSX.Element => {
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
              {!switchAccount ? "All Circuits" : "All Orders"}
            </div>
            <div
              className="relative h-3 w-4 flex items-center justify-center -top-0.5"
              id="boxGrad"
            ></div>
            <div className="relative h-1 w-full bg-moda flex items-center justify-center"></div>
          </div>
          <div className="relative w-full h-full gap-3 font-vcr px-2 items-center overflow-y-scroll">
            <div className="justify-start h-fit items-center gap-3 w-full flex flex-col break-words">
              {(!switchAccount ? allUserCircuits : allOrders)?.map(
                (value: AllCircuits | Order, index: number) => {
                  let completed: boolean;
                  if (!switchAccount) {
                    completed =
                      (value as AllCircuits)?.completed ||
                      (value as AllCircuits).monitorExecutions ===
                        JSON.parse(
                          JSON.parse(
                            (value as AllCircuits).circuitInformation
                              ?.information as any
                          )?.executionConstraints
                        )?.conditionMonitorExecutions ||
                      (value as AllCircuits).circuitExecutions ===
                        JSON.parse(
                          JSON.parse(
                            (value as AllCircuits).circuitInformation
                              ?.information as any
                          )?.executionConstraints
                        )?.maxLitActionCompletions;
                  }

                  const reverseIndex = !switchAccount
                    ? allUserCircuits.length - index
                    : allOrders.length - index;

                  return (
                    <div
                      key={index}
                      className={`relative w-fit xl:w-full h-fit flex flex-row justify-center items-center gap-3 cursor-pointer active:scale-95 hover:text-sol active:text-sol grow text-center 
                  ${
                    (
                      !switchAccount
                        ? (value as AllCircuits)?.circuitInformation?.id ===
                          selectedCircuitSideBar
                        : (value as Order)?.orderId ===
                          selectedOrderSideBar?.orderId
                    )
                      ? "text-sol"
                      : "text-white"
                  }  `}
                      onClick={() =>
                        !switchAccount
                          ? dispatch(
                              setSelectedUserCircuitSideBar(
                                (value as AllCircuits)?.circuitInformation?.id
                              )
                            )
                          : dispatch(setSelectedOrderSideBar(value as Order))
                      }
                    >
                      <div className="relative flex flex-col relative w-full h-fit justify-start items-center">
                        <div
                          className="flex relative w-full h-fit uppercase items-center justify-center text-sm flex-row gap-1"
                          id="blur"
                        >
                          <div className="relative w-fit h-fit flex items-center justify-start">
                            {!switchAccount ? "Circuit" : "Order"}{" "}
                            {reverseIndex}:
                          </div>
                          <div
                            className={`relative w-fit h-fit flex items-center justify-start ${
                              !switchAccount
                                ? (value as AllCircuits)?.interrupted
                                  ? "text-costa"
                                  : completed!
                                  ? "text-comp"
                                  : "text-run"
                                : (value as Order).isFulfilled
                                ? "text-comp"
                                : (value as Order).orderStatus?.[0] ===
                                  "ordered"
                                ? "text-costa"
                                : "text-run"
                            }`}
                          >
                            {!switchAccount
                              ? (value as AllCircuits)?.interrupted
                                ? `(interrupted)`
                                : completed!
                                ? `(completed)`
                                : `(running)`
                              : (value as Order).isFulfilled
                              ? "(fulfilled)"
                              : (value as Order).orderStatus?.[0] === "ordered"
                              ? "(ordered)"
                              : "(shipping)"}
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
                }
              )}
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
