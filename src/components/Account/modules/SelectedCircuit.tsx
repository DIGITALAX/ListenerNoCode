import { FunctionComponent } from "react";
import { Details, SelectedCircuitProps, Sub } from "../types/account.types";
import { convertDate } from "../../../../lib/helpers/convertDate";
import { AiOutlineLoading } from "react-icons/ai";
import moment from "moment";
import copy from "copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import Link from "next/link";
import { ACCEPTED_TOKENS, INFURA_GATEWAY } from "../../../../lib/constants";
import Image from "next/legacy/image";

const SelectedCircuit: FunctionComponent<SelectedCircuitProps> = ({
  selectedCircuit,
  interruptLoading,
  handleInterruptCircuit,
  selectedOrder,
  switchAccount,
  decryptFulfillment,
  decryptLoading,
}): JSX.Element => {
  switch (switchAccount) {
    case true:
      return (
        <div className="relative w-full h-full justify-center items-center flex">
          <div
            className="relative w-5/6 h-5/6 justify-center items-center bg-black/50 flex flex-col p-3 gap-3"
            id="inputBorder"
          >
            <div className="relative w-full h-fit justify-between items-center inline-flex flex-wrap gap-4 font-vcr text-sm">
              <div className="relative flex flex-row gap-3">
                <div className="relative flex items-center justify-center text-white">
                  Order Id:
                </div>
                <div className="relative flex items-center justify-center text-ballena">
                  {selectedOrder?.orderId}
                </div>
              </div>

              <div className="relative flex flex-row h-fit w-fit">
                <div
                  className={`relative flex items-center justify-center border border-white p-2 text-white h-8 w-40 ${
                    !selectedOrder?.decrypted &&
                    !decryptLoading &&
                    "cursor-pointer"
                  } ${!selectedOrder?.decrypted ? "bg-rojo" : "bg-comp"}`}
                  onClick={() =>
                    !selectedOrder?.decrypted && decryptFulfillment()
                  }
                >
                  <div
                    className={`relative w-fit h-fit flex items-center justify-center text-xs ${
                      decryptLoading && "animate-spin"
                    }`}
                  >
                    {decryptLoading ? (
                      <AiOutlineLoading size={15} color="white" />
                    ) : !selectedOrder?.decrypted ? (
                      "Decrypt Fulfillment"
                    ) : (
                      "Decrypted"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative bg-white h-px w-full"></div>
            <div className="relative w-full h-full flex flex-col overflow-y-scroll px-2 gap-4">
              <div className="relative w-full h-fit inline-flex flex-wrap gap-3 justify-between items-center font-vcr pt-3">
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">Name</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.decrypted
                      ? (selectedOrder?.details as Details)?.name
                      : "@#$13l33t"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">Address</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.decrypted
                      ? (selectedOrder?.details as Details)?.address
                      : "@#$13l33t"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">City</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.decrypted
                      ? (selectedOrder?.details as Details)?.city
                      : "@#$13l33t"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">State</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.decrypted
                      ? (selectedOrder?.details as Details)?.state
                      : "@#$13l33t"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">Zip</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.decrypted
                      ? (selectedOrder?.details as Details)?.zip
                      : "@#$13l33t"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">Country</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.decrypted
                      ? (selectedOrder?.details as Details)?.country
                      : "@#$13l33t"}
                  </div>
                </div>
              </div>
              <div className="relative w-full h-fit inline-flex flex-wrap  justify-between items-center font-vcr pt-3 gap-3">
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Order Created:
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.blockTimestamp &&
                      convertDate(selectedOrder?.blockTimestamp)}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Order Block Number:
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.blockNumber}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Total Order Price:
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {Number(selectedOrder?.totalPrice)}{" "}
                    {
                      ACCEPTED_TOKENS.find(
                        ([_, __, token]) =>
                          token === selectedOrder?.currency?.toLowerCase()
                      )?.[1] as `0x${string}`
                    }
                  </div>
                </div>
              </div>
              <div className="relative w-full h-fit inline-flex flex-wrap gap-3 justify-between items-center font-vcr pt-3">
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Order TX:
                  </div>
                  <Link
                    className="relative w-fit h-fit text-sol break-all cursor-pointer"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://polygonscan.com/tx/${selectedOrder?.transactionHash}`}
                  >
                    {selectedOrder?.transactionHash}
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative bg-white h-px w-full"></div>
            <div className="relative w-full h-full flex flex-col gap-2 overflow-y-scroll px-2">
              <div className="relative w-fit h-fit text-white font-vcr text-sm">
                Item Details
              </div>
              <div className="relative w-full h-fit flex flex-col gap-4">
                {selectedOrder?.subOrders?.map((sub: Sub, index: number) => {
                  return (
                    <div
                      className="relative w-full h-fit flex md:flex-nowrap flex-wrap flex-row items-center justify-between gap-3"
                      key={index}
                    >
                      <div className="relative w-fit h-fit flex items-center justify-center">
                        <div
                          className="relative flex w-20 h-20 rounded-sm border border-white cursor-pointer"
                          onClick={() =>
                            window.open(
                              `https://cypher.digitalax.xyz/item/listener/${sub?.collection?.name?.replaceAll(
                                " ",
                                "_"
                              )}`
                            )
                          }
                        >
                          <Image
                            layout="fill"
                            src={`${INFURA_GATEWAY}/ipfs/${
                              selectedOrder?.images?.[0]?.split("ipfs://")?.[1]
                            }`}
                            className="rounded-sm"
                            objectFit="cover"
                            draggable={false}
                          />
                        </div>
                      </div>
                      <div className="relative w-full h-fit flex items-center justify-between gap-3 flex-wrap md:flex-nowrap">
                        <div className="relative flex w-fit h-fit items-center justify-center text-sm font-vcr text-white">
                          ${Number(sub?.price) / Number(sub?.amount)}
                        </div>
                        <div className="relative flex w-fit h-fit items-center justify-center text-sm font-vcr text-white">
                          {sub?.isFulfilled
                            ? "Fulfilled"
                            : "Processing for Fulfillment"}
                        </div>
                        <div className="relative flex w-fit h-fit items-center justify-center text-sm font-vcr text-white">
                          Qty.{sub?.amount}
                        </div>

                        <div
                          className={`relative flex h-7 border border-white p-px items-center justify-center font-vcr text-white ${
                            ["xs", "s", "m", "l", "xl", "2xl"].includes(
                              sub?.size?.toLowerCase() || ""
                            ) || !selectedOrder?.decrypted
                              ? "rounded-full w-7 text-sm"
                              : "w-fit px-1 rounded-sm text-xxs"
                          }`}
                        >
                          {sub?.size && selectedOrder?.decrypted
                            ? sub?.size
                            : "??"}
                        </div>
                        <div
                          className={`relative flex w-7 h-7 border border-white p-px rounded-full items-center justify-center text-sm font-vcr text-white`}
                          style={{
                            backgroundColor:
                              sub?.color && selectedOrder?.decrypted
                                ? `${sub?.color}`
                                : "#131313",
                          }}
                        >
                          {(!sub?.color || !selectedOrder?.decrypted) && "?"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative bg-white h-px w-full"></div>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-full justify-center items-center flex">
          <div
            className="relative w-5/6 h-5/6 justify-center items-center bg-black/50 flex flex-col p-3 gap-3"
            id="inputBorder"
          >
            <div className="relative w-full h-fit justify-between items-center inline-flex flex-wrap gap-4 font-vcr text-sm">
              <div className="relative flex flex-row gap-3">
                <div className="relative flex items-center justify-center text-white">
                  Circuit Id:
                </div>
                <div className="relative flex items-center justify-center text-ballena">
                  {selectedCircuit?.circuitInformation?.id?.slice(0, 8) +
                    "-" +
                    selectedCircuit?.circuitInformation?.id?.slice(8, 12) +
                    "-" +
                    selectedCircuit?.circuitInformation?.id?.slice(12, 16) +
                    "-" +
                    selectedCircuit?.circuitInformation?.id?.slice(16, 20) +
                    "-" +
                    selectedCircuit?.circuitInformation?.id?.slice(20)}
                </div>
              </div>
              {!selectedCircuit ||
              (Object.keys(selectedCircuit?.completed).length === 0 &&
                Object.keys(selectedCircuit?.interrupted).length === 0 &&
                selectedCircuit.logs.monitorExecutions !==
                  selectedCircuit.circuitInformation?.information
                    ?.executionConstraints?.conditionMonitorExecutions &&
                selectedCircuit.logs.circuitExecutions !==
                  selectedCircuit.circuitInformation?.information
                    ?.executionConstraints?.maxLitActionCompletions) ? (
                <div className="relative flex flex-row h-fit w-fit">
                  <div
                    className={`relative flex items-center justify-center border border-white p-2 bg-ballena text-black h-8 w-36 ${
                      !interruptLoading && "cursor-pointer active:scale-95"
                    }`}
                    onClick={() =>
                      handleInterruptCircuit(
                        selectedCircuit?.circuitInformation?.id?.slice(0, 8) +
                          "-" +
                          selectedCircuit?.circuitInformation?.id?.slice(
                            8,
                            12
                          ) +
                          "-" +
                          selectedCircuit?.circuitInformation?.id?.slice(
                            12,
                            16
                          ) +
                          "-" +
                          selectedCircuit?.circuitInformation?.id?.slice(
                            16,
                            20
                          ) +
                          "-" +
                          selectedCircuit?.circuitInformation?.id?.slice(20)
                      )
                    }
                  >
                    <div
                      className={`relative w-fit h-fit flex items-center justify-center text-xs ${
                        interruptLoading && "animate-spin"
                      }`}
                    >
                      {interruptLoading ? (
                        <AiOutlineLoading color="black" size={15} />
                      ) : (
                        "Interrupt Circuit"
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative flex flex-row h-fit w-fit">
                  <div
                    className={`relative flex items-center justify-center border border-white p-2 bg-comp text-white h-8 w-40`}
                  >
                    <div
                      className={`relative w-fit h-fit flex items-center justify-center text-xs`}
                    >
                      {Object.keys(selectedCircuit?.interrupted).length !== 0
                        ? "Circuit Interrupted"
                        : "Circuit Completed"}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative bg-white h-px w-full"></div>
            <div className="relative w-full h-44 flex flex-col overflow-y-scroll">
              <div className="relative w-full h-fit inline-flex flex-wrap  justify-between items-center font-vcr pt-3 gap-3">
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Circuit Instantiated:
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedCircuit?.blockTimestamp &&
                      convertDate(selectedCircuit?.blockTimestamp)}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Circuit Block Number:
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedCircuit?.blockNumber}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Lit Action Code IPFS Hash:
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    ipfs://{selectedCircuit?.circuitInformation?.ipfs}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Action Count
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedCircuit?.circuitInformation?.information
                      ?.circuitActions?.length || 0}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Condition Count
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedCircuit?.circuitInformation?.information
                      ?.circuitActions?.length || 0}
                  </div>
                </div>
              </div>
              <div className="relative w-full h-fit inline-flex flex-wrap gap-3 justify-between items-center font-vcr pt-3">
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Assigned PKP Token Id
                  </div>
                  <div className="relative w-fit h-fit text-sol break-all">
                    {selectedCircuit?.circuitInformation?.tokenId}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Assigned PKP Address
                  </div>
                  <div className="relative w-fit h-fit text-sol break-all">
                    {selectedCircuit?.circuitInformation?.pkpAddress}
                  </div>
                </div>
              </div>
              <div className="relative w-full h-fit inline-flex flex-wrap gap-3 justify-between items-center font-vcr pt-3">
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Conditional Logic Type
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {
                      selectedCircuit?.circuitInformation?.information
                        ?.conditionalLogic?.type
                    }
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Interval
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {
                      selectedCircuit?.circuitInformation?.information
                        ?.conditionalLogic?.interval
                    }{" "}
                    ms
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Max Monitor Executions
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedCircuit?.logs?.monitorExecutions || 0} /{" "}
                    {selectedCircuit?.circuitInformation?.information
                      ?.executionConstraints?.conditionMonitorExecutions || "∞"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Max Circuit Executions
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedCircuit?.logs?.circuitExecutions || 0} /{" "}
                    {selectedCircuit?.circuitInformation?.information
                      ?.executionConstraints?.maxLitActionCompletions || "∞"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Start Date
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {moment(
                      selectedCircuit?.circuitInformation?.information
                        ?.executionConstraints?.startDate
                    ).calendar()}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Expected End Date
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {moment(
                      selectedCircuit?.circuitInformation?.information
                        ?.executionConstraints?.endDate
                    ).calendar()}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative bg-white h-px w-full"></div>
            <div className="relative w-full h-fit flex flex-row justify-between items-center font-vcr pt-3">
              <div className="relative w-fit h-fit text-white text-sm">
                Circuit Logs
              </div>
            </div>
            <div className="relative w-full h-full flex overflow-y-scroll">
              <div className="relative w-full h-fit flex flex-col gap-3">
                {selectedCircuit?.logs?.stringifiedLogs?.map(
                  (log, index: number) => {
                    let data: string;
                    if (Number(log?.category) === 0) {
                      try {
                        data = JSON.parse(log.responseObject).message;
                      } catch (error) {
                        data = log.responseObject?.split("[ See:")[0];
                      }
                    } else if (Number(log?.category) === 1) {
                      data = "copy response object";
                    } else {
                      data = log?.responseObject;
                    }
                    return (
                      <div
                        key={index}
                        className="relative flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 font-vcr text-xs px-1.5 p-2 border border-white bg-black/60"
                      >
                        <div
                          className={`relative flex w-36 h-fit ${
                            Number(log?.category) === 0
                              ? "text-rojo"
                              : Number(log?.category) === 1
                              ? "text-run"
                              : Number(log?.category) === 2
                              ? "text-costa"
                              : Number(log?.category) === 3
                              ? "text-comp"
                              : "text-rio"
                          }`}
                        >
                          {Number(log?.category) === 0
                            ? "ERROR >>>"
                            : Number(log?.category) === 1
                            ? "RESPONSE >>>"
                            : Number(log?.category) === 2
                            ? "CONDITION >>>"
                            : Number(log?.category) === 3
                            ? "BROADCAST >>>"
                            : "EXECUTION >>>"}
                        </div>
                        <div className="relative flex flex-col gap-1.5 text-white w-full sm:pl-10">
                          <div className="relative w-fit h-fit flex text-ballena justify-center">
                            Message
                          </div>
                          <div className="relative w-fit h-fit flex break-words justify-center">
                            {log?.message}
                          </div>
                        </div>
                        <div className="relative w-full h-fit flex flex-col gap-1.5 text-white items-start justify-center">
                          <div className="relative w-fit h-fit text-ballena items-end">
                            Data
                          </div>
                          {Number(log?.category) === 1 ? (
                            <div className="relative w-full h-fit flex break-words flex-row gap-1.5">
                              <div className="relative w-fit h-fit flex items-center justify-center whitespace-no-wrap">
                                {data}
                              </div>
                              <div
                                className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
                                onClick={() => copy(log?.responseObject)}
                              >
                                <BiCopy size={15} color="#FFD85F" />
                              </div>
                            </div>
                          ) : (
                            <div className="relative w-fit h-fit flex break-words">
                              {data}
                            </div>
                          )}
                        </div>
                        <div className="relative w-fit h-fit flex flex-col gap-1.5 text-white sm:ml-auto sm:items-end justify-center">
                          <div className="relative w-fit h-fit text-ballena items-end">
                            Timestamp
                          </div>
                          <div className="relative w-fit h-fit flex break-words">
                            {new Date(log?.isoDate).getDate() || 0}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default SelectedCircuit;
