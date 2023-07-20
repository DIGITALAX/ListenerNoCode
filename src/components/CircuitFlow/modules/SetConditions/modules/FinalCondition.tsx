import { FinalConditionProps } from "@/components/CircuitFlow/types/circuitflow.types";
import {
  ContractCondition,
  WebhookCondition,
} from "@/components/CircuitFlow/types/litlistener.types";
import { FunctionComponent } from "react";
import { setConditionFlow } from "../../../../../../redux/reducers/conditionFlowSlice";

const FinalCondition: FunctionComponent<FinalConditionProps> = ({
  conditionInformation,
  conditionType,
  editingState,
  conditionFlowIndex,
  handleUpdateCondition,
  handleAddConditionAndReset,
  dispatch,
  apiPassword,
  setApiPassword,
  expectedValues,
  eventArgs,
  inputs,
  circuitInformation,
}) => {
  switch (conditionType) {
    case "web":
      const webHookInfo = conditionInformation as WebhookCondition;
      return (
        <div
          className={`relative w-full overflow-y-scroll flex flex-col gap-10 items-start justify-star h-60 grow p-2.5 ${
            circuitInformation.conditions.length > 0 && "pb-20"
          } `}
        >
          <div className="relative w-full h-full flex items-center justify-center text-center">
            <div className="relative w-3/4 h-fit font-vcr text-white items-center justify-center flex text-center break-words whitespace-pre-wrap">
              {`Your webhook condition will query ${
                webHookInfo?.baseUrl + webHookInfo?.endpoint
              } and check if the returned value at ${
                webHookInfo?.responsePath
              } is ${webHookInfo?.matchOperator} to ${
                webHookInfo?.expectedValue
              }.`}
            </div>
          </div>
          <div
            className={`relative w-fit inline-flex flex-wrap items-start justify-center gap-3 px-3 h-fit`}
          >
            {Array.from([
              String(webHookInfo?.baseUrl || ""),
              String(webHookInfo?.endpoint || ""),
              String(webHookInfo?.responsePath || ""),
              String(webHookInfo?.apiKey || "") || "null",
              String(webHookInfo?.expectedValue || ""),
              String(webHookInfo?.matchOperator || ""),
            ]).map((value: string, index: number) => {
              return (
                <div
                  key={index}
                  className="relative w-fit h-11 flex flex-row p-1 gap-3 justify-between items-center px-1.5"
                  id="inputBorder"
                >
                  <div className="relative w-fit h-fit text-left justify-start items-center flex text-white font-vcr text-sm whitespace-nowrap break-words">
                    {
                      [
                        "Base URL",
                        "Endpoint",
                        "Response Path",
                        "API Key",
                        "Expected Value",
                        "Match Operator",
                      ][index]
                    }
                  </div>
                  <div
                    className="relative flex w-fit h-fit"
                    onClick={() =>
                      setApiPassword &&
                      index === 3 &&
                      value !== "" &&
                      value !== "null" &&
                      setApiPassword(!apiPassword)
                    }
                  >
                    <input
                      value={value || ""}
                      className={`bg-aBlack w-44 h-8 p-1 text-white font-vcr text-sm justify-end items-start flex bg-black/40 lowercase border border-ballena border-l-8 ${
                        index === 3 && "cursor-pointer"
                      }`}
                      disabled
                      type={
                        index === 3 &&
                        apiPassword &&
                        value !== "" &&
                        value !== "null"
                          ? "password"
                          : "text"
                      }
                    />
                  </div>
                </div>
              );
            })}
            <div className="relative w-full h-fit items-center justify-center flex">
              <div
                className="relative w-fit h-fit px-2 py-1.5 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95 border border-ballena bg-white"
                onClick={() =>
                  conditionFlowIndex.index === 0
                    ? dispatch(
                        setConditionFlow({
                          index: conditionFlowIndex.index + 1,
                          contractCount: conditionFlowIndex.contractCount,
                          webhookCount: conditionFlowIndex.webhookCount,
                        })
                      )
                    : editingState
                    ? handleUpdateCondition()
                    : handleAddConditionAndReset()
                }
              >
                <div className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-black text-sm">
                  {editingState ? "UPDATE CONDITION" : "ADD CONDITION"}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      const contractInfo = conditionInformation as ContractCondition;
      return (
        <div
          className={`relative w-full overflow-y-scroll flex flex-col gap-10 items-start justify-start h-60 ${
            circuitInformation.conditions.length > 0 && "pb-20"
          } grow p-2.5`}
        >
          <div className="relative w-full h-full flex items-center justify-center text-center">
            <div className="relative w-3/4 h-fit font-vcr text-white items-center justify-center flex text-center break-words whitespace-pre-wrap">
              {`Your contract condition will monitor the ${
                contractInfo?.eventName
              } event emitted by ${contractInfo?.contractAddress} on ${
                contractInfo?.chainId
              } and check if the returned values from ${JSON.stringify(
                eventArgs
              )} at are ${contractInfo?.matchOperator} to ${JSON.stringify(
                expectedValues
              )}
            .`}
            </div>
          </div>
          <div className="relative w-full h-fit flex flex-col flex-wrap items-center justify-center gap-3 px-3">
            {Array.from([
              String(contractInfo?.contractAddress || ""),
              String(contractInfo?.chainId || "ethereum"),
              String(contractInfo?.matchOperator || ""),
              String(contractInfo?.eventName || ""),
              eventArgs || [],
              expectedValues || [],
              inputs || [],
            ]).map((value: string | any[], index: number) => {
              return (
                <div
                  key={index}
                  className={`relative w-fit flex p-1 gap-3 items-start px-1.5 ${
                    index === 6
                      ? "h-60 overflow-y-scroll flex-col"
                      : index === 4 || index === 5
                      ? "h-24 overflow-y-scroll flex-col"
                      : "h-11 flex-row justify-between"
                  }`}
                  id="inputBorder"
                >
                  <div
                    className={`relative w-fit text-left flex text-white font-vcr text-sm whitespace-nowrap break-words ${
                      index === 6 || index === 4 || index === 5
                        ? "justify-start items-start h-fit"
                        : "justify-start items-center h-full"
                    }`}
                  >
                    {
                      [
                        "Contract Address",
                        "Chain Name",
                        "Match Operator",
                        "Event Name",
                        "Event Args",
                        "Expected Values",
                        "ABI Inputs",
                      ][index]
                    }
                  </div>
                  {index === 6 ? (
                    <div className="relative w-fit h-fit flex flex-col gap-1 justify-start items-start overflow-y-scroll">
                      {(
                        value as {
                          indexed: boolean;
                          internalType: string;
                          name: string;
                          type: string;
                        }[]
                      )?.map(
                        (
                          item: {
                            indexed: boolean;
                            internalType: string;
                            name: string;
                            type: string;
                          },
                          indexTwo: number
                        ) => {
                          return (
                            <div
                              className="relative w-72 h-fit flex flex-col font-vcr text-white gap-3"
                              key={indexTwo}
                            >
                              <div className="relative w-full h-fit flex flex-col gap-1">
                                <div
                                  className="relative w-fit h-fit flex"
                                  id="blur"
                                >
                                  Indexed
                                </div>
                                <div
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center"
                                  id="borderLight"
                                >
                                  {`${item?.indexed}`}
                                </div>
                              </div>
                              <div className="relative w-full h-fit flex flex-col gap-1">
                                <div
                                  className="relative w-fit h-fit flex"
                                  id="blur"
                                >
                                  Internal Type
                                </div>
                                <div
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center"
                                  id="borderLight"
                                >
                                  {item?.internalType}
                                </div>
                              </div>
                              <div className="relative w-full h-fit flex flex-col gap-1">
                                <div
                                  className="relative w-fit h-fit flex"
                                  id="blur"
                                >
                                  Type
                                </div>
                                <div
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center"
                                  id="borderLight"
                                >
                                  {item?.type}
                                </div>
                              </div>
                              <div className="relative w-full h-fit flex flex-col gap-1">
                                <div
                                  className="relative w-fit h-fit flex"
                                  id="blur"
                                >
                                  Name
                                </div>
                                <div
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center"
                                  id="borderLight"
                                >
                                  {item?.name}
                                </div>
                              </div>
                              <div className="relative w-full px-1 h-1 bg-ballena"></div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : index === 4 || index === 5 ? (
                    <div className="relative w-fit h-full flex overflow-y-scroll">
                      <div className="relative w-fit h-fit flex flex-col gap-1 justify-start items-start">
                        {(value as string[])?.map(
                          (item: string, indexTwo: number) => {
                            return (
                              <textarea
                                value={item || ""}
                                key={indexTwo}
                                className="bg-aBlack w-44 h-8 p-1 text-white font-vcr text-sm justify-end items-start flex bg-black/40 lowercase border border-ballena border-l-8"
                                disabled
                                style={{ resize: "none" }}
                              ></textarea>
                            );
                          }
                        )}
                      </div>
                    </div>
                  ) : (
                    <input
                      value={value || ""}
                      className="bg-aBlack w-44 h-8 p-1 text-white font-vcr text-sm justify-end items-start flex bg-black/40 lowercase border border-ballena border-l-8"
                      disabled
                    />
                  )}
                </div>
              );
            })}
            <div className="relative w-full h-fit items-center justify-center flex">
              <div
                className="relative w-fit h-fit px-2 py-1.5 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95 border border-ballena bg-white"
                onClick={() =>
                  conditionFlowIndex.index === 0
                    ? dispatch(
                        setConditionFlow({
                          index: conditionFlowIndex.index + 1,
                          contractCount: conditionFlowIndex.contractCount,
                          webhookCount: conditionFlowIndex.webhookCount,
                        })
                      )
                    : editingState
                    ? handleUpdateCondition()
                    : handleAddConditionAndReset()
                }
              >
                <div className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-black text-sm">
                  {editingState ? "UPDATE CONDITION" : "ADD CONDITION"}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default FinalCondition;
