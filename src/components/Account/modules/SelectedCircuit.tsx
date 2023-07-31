import { FunctionComponent } from "react";
import { Order, SelectedCircuitProps } from "../types/account.types";
import { convertDate } from "../../../../lib/helpers/convertDate";
import { AiOutlineLoading } from "react-icons/ai";
import moment from "moment";
import copy from "copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import Link from "next/link";
import { ACCEPTED_TOKENS, INFURA_GATEWAY } from "../../../../lib/constants";
import Image from "next/legacy/image";
import { AllShop } from "@/components/Shop/types/shop.types";

const SelectedCircuit: FunctionComponent<SelectedCircuitProps> = ({
  selectedCircuit,
  interruptLoading,
  handleInterruptCircuit,
  selectedOrder,
  switchAccount,
  decryptFulfillment,
  decryptLoading,
  allOrders,
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
                    !selectedOrder?.fulfillmentInformation
                      .decryptedFulfillment &&
                    !decryptLoading &&
                    "cursor-pointer"
                  } ${
                    !selectedOrder?.fulfillmentInformation.decryptedFulfillment
                      ? "bg-rojo"
                      : "bg-comp"
                  }`}
                  onClick={() =>
                    !selectedOrder?.fulfillmentInformation
                      .decryptedFulfillment && decryptFulfillment()
                  }
                >
                  <div
                    className={`relative w-fit h-fit flex items-center justify-center text-xs ${
                      decryptLoading && "animate-spin"
                    }`}
                  >
                    {decryptLoading ? (
                      <AiOutlineLoading size={15} color="white" />
                    ) : !selectedOrder?.fulfillmentInformation
                        .decryptedFulfillment ? (
                      "Decrypt Fulfillment"
                    ) : (
                      "Decrypted"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative bg-white h-px w-full"></div>
            <div className="relative w-full h-44 flex flex-col overflow-y-scroll">
              <div className="relative w-full h-fit inline-flex flex-wrap gap-3 justify-between items-center font-vcr pt-3">
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">Name</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.fulfillmentInformation.decryptedFulfillment
                      ?.name || "@#$13l33t"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">Contact</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.fulfillmentInformation.decryptedFulfillment
                      ?.contact || "@#$13l33t"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">Address</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.fulfillmentInformation.decryptedFulfillment
                      ?.address || "@#$13l33t"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">City</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.fulfillmentInformation.decryptedFulfillment
                      ?.city || "@#$13l33t"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">State</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.fulfillmentInformation.decryptedFulfillment
                      ?.state || "@#$13l33t"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">Zip</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.fulfillmentInformation.decryptedFulfillment
                      ?.zip || "@#$13l33t"}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">Country</div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.fulfillmentInformation.decryptedFulfillment
                      ?.country || "@#$13l33t"}
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
                    Fulfiller Id
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {selectedOrder?.fulfillerId}
                  </div>
                </div>
                <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
                  <div className="relative w-fit h-fit text-white">
                    Order Fulfilled
                  </div>
                  <div className="relative w-fit h-fit text-sol">
                    {String(selectedOrder?.isFulfilled)}
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
                    {Number(selectedOrder?.totalPrice) /
                      (selectedOrder?.chosenAddress?.toLowerCase() ===
                      "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
                        ? 10 ** 6
                        : 10 ** 18)}{" "}
                    {
                      ACCEPTED_TOKENS.find(
                        ([_, __, token]) =>
                          token === selectedOrder?.chosenAddress?.toLowerCase()
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
            <div className="relative w-full h-fit flex flex-col">
              <div className="relative w-full h-fit flex flex-row justify-between items-center font-vcr pt-3">
                <div className="relative w-fit h-fit text-white text-sm">
                  Item Details
                </div>
              </div>
              <div className="relative w-full h-24 flex overflow-y-scroll">
                <div className="relative flex flex-col gap-2 h-fit w-full">
                  {selectedOrder?.collectionDetails?.map(
                    (coll: AllShop, index: number) => {
                      return (
                        <div
                          key={index}
                          className={`relative w-full h-12 flex flex-row gap-5 text-white text-xs justify-between items-center px-1.5 bg-ama/20 rounded-md font-vcr`}
                        >
                          <div className="relative w-10 h-8 rounded-lg bg-cross flex items-center justify-center">
                            <Image
                              src={`${INFURA_GATEWAY}/ipfs/${
                                coll.uri.images?.[0]?.split("ipfs://")[1]
                              }`}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-lg"
                              draggable={false}
                            />
                          </div>
                          <div className="relative w-fit h-fit text-ama flex break-words">
                            {coll.uri?.name}
                          </div>
                          <div className="relative w-fit h-fit text-ama flex break-words">
                            size:{" "}
                            {selectedOrder?.fulfillmentInformation
                              ?.decryptedFulfillment?.sizes?.[index] || "#$%"}
                          </div>
                          <div className="relative w-fit h-fit text-ama flex break-words">
                            amt:{" "}
                            {selectedOrder?.fulfillmentInformation
                              ?.decryptedFulfillment?.collectionAmounts?.[
                              index
                            ] || "#$%"}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            <div className="relative bg-white h-px w-full"></div>
            <div className="relative w-full h-fit flex flex-row justify-between items-center font-vcr pt-3">
              <div className="relative w-fit h-fit text-white text-sm">
                Order History
              </div>
            </div>
            <div className="relative w-full h-full flex overflow-y-scroll">
              <div className="relative w-full h-fit flex flex-col gap-3">
                {selectedOrder?.isFulfilled && (
                  <div className="relative flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 font-vcr text-xs px-1.5 p-2 border border-white bg-black/60">
                    <div
                      className={`relative uppercase flex w-36 h-fit text-comp`}
                    >
                      {`FULFILLED >>>`}
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-1.5 text-white items-start justify-center">
                      <div className="relative w-fit h-fit text-ballena items-end">
                        Message
                      </div>
                      <div className="relative w-fit h-fit flex break-words">
                        Order fulfilled.
                      </div>
                    </div>
                  </div>
                )}
                {selectedOrder?.orderStatus?.map((log, index: number) => {
                  let data: string;
                  if (log === "ordered") {
                    data = "Order registered. In process at The Manufactory.";
                  } else if (log === "shipped") {
                    data = "Order shipped from The Manufactory.";
                  } else {
                    data = "Order complete and fulfilled.";
                  }
                  return (
                    <div
                      key={index}
                      className="relative flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 font-vcr text-xs px-1.5 p-2 border border-white bg-black/60"
                    >
                      <div
                        className={`relative uppercase flex w-36 h-fit ${
                          log === "ordered"
                            ? "text-rio"
                            : log === "shipped"
                            ? "text-run"
                            : "text-comp"
                        }`}
                      >
                        {`${log} >>>`}
                      </div>

                      <div className="relative w-full h-fit flex flex-col gap-1.5 text-white items-start justify-center">
                        <div className="relative w-fit h-fit text-ballena items-end">
                          Message
                        </div>
                        <div className="relative w-fit h-fit flex break-words">
                          {data}
                        </div>
                      </div>
                      <div className="relative w-fit h-fit flex flex-col gap-1.5 text-white sm:ml-auto sm:items-end justify-center">
                        <div className="relative w-fit h-fit text-ballena items-end">
                          Timestamp
                        </div>
                        <div className="relative w-fit h-fit flex break-words whitespace-nowrap">
                          {convertDate(
                            selectedOrder.orderStatusTimestamps[index]
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
