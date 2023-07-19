import { FinalConditionProps } from "@/components/CircuitFlow/types/circuitflow.types";
import {
  ContractCondition,
  WebhookCondition,
} from "@/components/CircuitFlow/types/litlistener.types";
import { FunctionComponent } from "react";
import { setConditionFlow } from "../../../../../../../redux/reducers/conditionFlowSlice";

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
}) => {
  switch (conditionType) {
    case "web":
      const webHookInfo = conditionInformation as WebhookCondition;
      return (
        <div className="relative w-fit h-fit inline-flex flex-wrap items-start justify-center gap-3 px-3">
          {Array.from([
            String(webHookInfo?.baseUrl || ""),
            String(webHookInfo?.endpoint || ""),
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
                    [
                      "Base URL",
                      "Endpoint",
                      "API Key",
                      "Expected Value",
                      "Match Operator",
                    ][index] === "API Key" &&
                    setApiPassword(!apiPassword)
                  }
                >
                  <input
                    value={value || ""}
                    className={`bg-aBlack w-44 h-8 p-1 text-white font-vcr text-sm justify-end items-start flex bg-black/40 lowercase border border-ballena border-l-8 ${
                      [
                        "Base URL",
                        "Endpoint",
                        "API Key",
                        "Expected Value",
                        "Match Operator",
                      ][index] === "API Key" && "cursor-pointer"
                    }`}
                    disabled
                    type={apiPassword ? "password" : "text"}
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
      );

    default:
      const contractInfo = conditionInformation as ContractCondition;
      return (
        <div className="relative w-fit h-fit inline-flex flex-wrap items-start justify-center gap-3 px-3">
          {Array.from([
            String(contractInfo?.contractAddress || ""),
            String(contractInfo?.eventName || ""),
            String(contractInfo?.eventArgName || ""),
            String(contractInfo?.expectedValue || ""),
            String(contractInfo?.matchOperator || ""),
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
                      "Contract Address",
                      "ABI Inputs",
                      "Event Name",
                      "Event Args",
                      "Expected Value",
                      "Match Operator",
                    ][index]
                  }
                </div>
                <input
                  value={value || ""}
                  className="bg-aBlack w-44 h-8 p-1 text-white font-vcr text-sm justify-end items-start flex bg-black/40 lowercase border border-ballena border-l-8"
                  disabled
                />
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
      );
  }
};

export default FinalCondition;
