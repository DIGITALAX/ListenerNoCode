import {
  ContractAction,
  FetchAction,
} from "@/components/CircuitFlow/types/litlistener.types";
import { FunctionComponent, useContext } from "react";
import { ModalContext } from "@/pages/_app";
import { FinalActionProps } from "@/components/CircuitFlow/types/circuitflow.types";

const FinalAction: FunctionComponent<FinalActionProps> = ({
  actionType,
  editingState,
  handleUpdateAction,
  handleAddActionAndReset,
  apiPassword,
  setApiPassword,
  functionArgs,
  inputs,
  outputs,
  signConditions,
}) => {
  const context = useContext(ModalContext);
  switch (actionType) {
    case "fetch":
      const fetchInfo = context?.newFetchActionInfo as FetchAction;
      const toSign = !fetchInfo?.toSign
        ? ""
        : typeof fetchInfo?.toSign === "string"
        ? fetchInfo?.toSign
        : Array.isArray(fetchInfo?.toSign)
        ? fetchInfo.toSign
            .map((code) => String.fromCharCode(Number(code)))
            .join("")
        : "";

      return (
        <div
          className={`relative w-full overflow-y-scroll flex flex-col gap-10 items-start justify-start h-60 grow p-2.5 ${
            Number(context?.circuitInformation.actions.length) > 0 && "pb-20"
          } `}
        >
          <div className="relative w-full h-full flex items-center justify-center text-center">
            <div className="relative w-3/4 h-fit font-vcr text-white items-center justify-center flex text-center break-words whitespace-pre-wrap">
              {`Your webhook action will query ${
                fetchInfo?.baseUrl || "" + fetchInfo?.endpoint || ""
              } and check if the returned value at ${
                fetchInfo?.responsePath || ""
              } matches ${JSON.stringify(
                fetchInfo?.signCondition?.map((item) => item.value || "") &&
                  fetchInfo?.signCondition?.map((item) => item.value || "")
                    ?.length > 0
                  ? fetchInfo?.signCondition?.map((item) => item.value || "")
                  : signConditions?.map((item) => item.value || "")
              )} before signing ${toSign || ""}.`}
            </div>
          </div>
          <div
            className={`relative w-fit inline-flex flex-wrap items-start justify-center gap-3 px-3 h-fit`}
          >
            {Array.from([
              String(fetchInfo?.baseUrl || ""),
              String(fetchInfo?.endpoint || ""),
              String(fetchInfo?.responsePath || ""),
              String(fetchInfo?.apiKey || "") || "null",
              String(toSign || ""),
              (fetchInfo?.signCondition?.map((item) => item.value || "") &&
              fetchInfo?.signCondition?.map((item) => item.value || "")
                ?.length > 0
                ? fetchInfo?.signCondition
                : signConditions) || [],
            ]).map((value: string | any[], index: number) => {
              return (
                <div
                  key={index}
                  className={`relative w-fit flex p-1 gap-3 items-start px-1.5 ${
                    index === 5
                      ? "h-60 overflow-y-scroll flex-col"
                      : "h-11 flex-row justify-between"
                  }`}
                  id="inputBorder"
                >
                  <div
                    className={`relative w-fit text-left flex text-white font-vcr text-sm whitespace-nowrap break-words ${
                      index === 5
                        ? "justify-start items-start h-fit"
                        : "justify-start items-center h-full"
                    }`}
                  >
                    {
                      [
                        "Base URL",
                        "Endpoint",
                        "Response Path",
                        "API Key",
                        "To Sign",
                        "Sign Condition",
                      ][index]
                    }
                  </div>
                  {index === 5 ? (
                    <div className="relative w-fit h-fit flex flex-col gap-1 justify-start items-start overflow-y-scroll">
                      {(
                        value as {
                          type: string;
                          operator: string;
                          value: string | number | boolean;
                          valueType: string | number | boolean;
                        }[]
                      )?.map(
                        (
                          item: {
                            type: string;
                            operator: string;
                            value: string | number | boolean;
                            valueType: string | number | boolean;
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
                                  Type
                                </div>
                                <div
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center"
                                  id="borderLight"
                                >
                                  {`${item?.type}`}
                                </div>
                              </div>
                              <div className="relative w-full h-fit flex flex-col gap-1">
                                <div
                                  className="relative w-fit h-fit flex"
                                  id="blur"
                                >
                                  Operator
                                </div>
                                <div
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center"
                                  id="borderLight"
                                >
                                  {item?.operator}
                                </div>
                              </div>
                              <div className="relative w-full h-fit flex flex-col gap-1">
                                <div
                                  className="relative w-fit h-fit flex"
                                  id="blur"
                                >
                                  Value
                                </div>
                                <div
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center"
                                  id="borderLight"
                                >
                                  {item?.value}
                                </div>
                              </div>
                              <div className="relative w-full h-fit flex flex-col gap-1">
                                <div
                                  className="relative w-fit h-fit flex"
                                  id="blur"
                                >
                                  Value Type
                                </div>
                                <div
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center"
                                  id="borderLight"
                                >
                                  {item?.valueType}
                                </div>
                              </div>
                              <div className="relative w-full px-1 h-1 bg-ballena"></div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
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
                  )}
                </div>
              );
            })}
            <div className="relative w-full h-fit items-center justify-center flex">
              <div
                className="relative w-fit h-fit px-2 py-1.5 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95 border border-ballena bg-white"
                onClick={() =>
                  context?.actionFlow?.index === 0
                    ? context?.setActionFlow({
                        index: context?.actionFlow?.index + 1,
                        contractCount: context?.actionFlow?.contractCount,
                        fetchCount: context?.actionFlow?.fetchCount,
                      })
                    : editingState
                    ? handleUpdateAction()
                    : handleAddActionAndReset()
                }
              >
                <div className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-black text-sm">
                  {editingState ? "UPDATE ACTION" : "ADD ACTION"}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      const contractInfo = context?.newContractActionInfo as ContractAction;
      return (
        <div
          className={`relative w-full overflow-y-scroll flex flex-col gap-10 items-start justify-start h-60 ${
            Number(context?.circuitInformation.actions.length) > 0 && "pb-20"
          } grow p-2.5`}
        >
          <div className="relative w-full h-full flex items-center justify-center text-center">
            <div className="relative w-3/4 h-fit font-vcr text-white items-center justify-center flex text-center break-words whitespace-pre-wrap">
              {`Your contract action will sign a transaction at address ${
                contractInfo?.contractAddress || ""
              } for the ${
                contractInfo?.functionName || ""
              } function and with the ${JSON.stringify(
                (contractInfo?.args && contractInfo?.args?.length > 0
                  ? contractInfo?.args
                  : functionArgs) || ""
              )} args on the ${contractInfo?.chainId || ""} network.`}
            </div>
          </div>
          <div className="relative w-full h-fit flex flex-col flex-wrap items-center justify-center gap-3 px-3">
            {Array.from([
              String(contractInfo?.contractAddress || ""),
              String(contractInfo?.chainId || "ethereum"),
              String(contractInfo?.functionName || ""),
              (contractInfo?.args && contractInfo?.args?.length > 0
                ? contractInfo?.args
                : functionArgs) || [],
              ((contractInfo?.abi as any)?.[0]?.inputs?.length > 0
                ? (contractInfo?.abi as any)?.[0]?.inputs
                : inputs) || [],
              ((contractInfo?.abi as any)?.[0]?.outputs?.length > 0
                ? (contractInfo?.abi as any)?.[0]?.outputs
                : outputs) || [],
            ]).map((value: string | any[], index: number) => {
              return (
                <div
                  key={index}
                  className={`relative w-fit flex p-1 gap-3 items-start px-1.5 ${
                    index === 4 || index === 5
                      ? "h-60 overflow-y-scroll flex-col"
                      : index === 3
                      ? "h-24 overflow-y-scroll flex-col"
                      : "h-11 flex-row justify-between"
                  }`}
                  id="inputBorder"
                >
                  <div
                    className={`relative w-fit text-left flex text-white font-vcr text-sm whitespace-nowrap break-words ${
                      index === 3 || index === 4 || index === 5
                        ? "justify-start items-start h-fit"
                        : "justify-start items-center h-full"
                    }`}
                  >
                    {
                      [
                        "Contract Address",
                        "Chain Name",
                        "Function Name",
                        "Function Args",
                        "ABI Inputs",
                        "ABI Outputs",
                      ][index]
                    }
                  </div>
                  {index === 4 || index === 5 ? (
                    <div className="relative w-fit h-fit flex flex-col gap-1 justify-start items-start overflow-y-scroll">
                      {(
                        value as {
                          internalType: string;
                          name: string;
                          type: string;
                        }[]
                      )?.map(
                        (
                          item: {
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
                  ) : index === 3 ? (
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
                  context?.actionFlow?.index === 0
                    ? context?.setActionFlow({
                        index: context?.actionFlow?.index + 1,
                        contractCount: context?.actionFlow?.contractCount,
                        fetchCount: context?.actionFlow?.fetchCount,
                      })
                    : editingState
                    ? handleUpdateAction()
                    : handleAddActionAndReset()
                }
              >
                <div className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-black text-sm">
                  {editingState ? "UPDATE ACTION" : "ADD ACTION"}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default FinalAction;
