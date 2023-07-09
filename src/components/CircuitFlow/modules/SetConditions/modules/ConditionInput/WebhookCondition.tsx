import { FunctionComponent } from "react";
import ConditionInput from "./ConditionInput";
import Connector from "../../../Common/Connector";
import { WebhookConditionProps } from "@/components/CircuitFlow/types/circuitflow.types";

const WebhookCondition: FunctionComponent<WebhookConditionProps> = ({
  newWebhookConditionInformation,
  setNewWebhookConditionInformation,
  matchFunctionsWebhook,
  setMatchFunctionsWebhook,
}): JSX.Element => {
  return (
    <div className="relative flex flex-row items-center justify-center w-fit h-fit">
      <div
        className="relative w-60 h-60 flex flex-col p-2 gap-3"
        id="inputBorder"
      >
        <ConditionInput text="Enter API base URL, endpoint, value path and an API Key if required." />
        <div className="flex w-full h-full border-4 border-moda overflow-y-scroll">
          <div className="relative w-full h-fit gap-6 flex flex-col px-1.5 py-2.5">
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Base URL
              </div>
              <input
                value={newWebhookConditionInformation?.baseUrl || ""}
                placeholder="enter base URL"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  setNewWebhookConditionInformation({
                    ...newWebhookConditionInformation!,
                    baseUrl: e.target.value as any,
                  })
                }
              />
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Endpoint
              </div>
              <input
                value={newWebhookConditionInformation?.endpoint || ""}
                placeholder="enter endpoint"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  setNewWebhookConditionInformation({
                    ...newWebhookConditionInformation!,
                    endpoint: e.target.value as any,
                  })
                }
              />
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Event Response Path
              </div>
              <input
                value={newWebhookConditionInformation?.responsePath || ""}
                placeholder="enter.response.path.like.this"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  setNewWebhookConditionInformation({
                    ...newWebhookConditionInformation!,
                    responsePath: e.target.value as any,
                  })
                }
              />
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                API Key
              </div>
              <input
                type="password"
                value={newWebhookConditionInformation?.apiKey || ""}
                placeholder="if you need an api key"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  setNewWebhookConditionInformation({
                    ...newWebhookConditionInformation!,
                    apiKey: e.target.value as any,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <Connector topOnly />
      <div
        className="relative w-60 h-60 flex flex-col p-2 gap-3"
        id="inputBorder"
      >
        <ConditionInput text="Enter expected value and match operator and match functions." />
        <div className="flex w-full h-full border-4 border-moda overflow-y-scroll">
          <div className="relative w-full h-fit gap-6 flex flex-col px-1.5 py-2.5">
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Expected Value
              </div>
              <input
                value={
                  newWebhookConditionInformation?.expectedValue?.toString() || ""
                }
                placeholder="enter chain name"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  setNewWebhookConditionInformation({
                    ...newWebhookConditionInformation!,
                    expectedValue: e.target.value as any,
                  })
                }
              />
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Match Operator
              </div>
              <input
                value={newWebhookConditionInformation?.matchOperator || ""}
                placeholder="== > < != >= <= === !=="
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  setNewWebhookConditionInformation({
                    ...newWebhookConditionInformation!,
                    matchOperator: e.target.value as any,
                  })
                }
              />
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Matched, UnMatched, Error Functions
              </div>
              {Object.entries(matchFunctionsWebhook)?.map(
                ([propertyName, func]: [string, any], index: number) => {
                  return (
                    <input
                      key={index}
                      placeholder={propertyName}
                      value={func !== undefined ? func.toString() : ""}
                      className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                      id="borderLight"
                      onChange={(e) => {
                        const updatedMatchFunctions = {
                          ...matchFunctionsWebhook,
                          [propertyName]: e.target.value,
                        };
                        setMatchFunctionsWebhook(updatedMatchFunctions);
                      }}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhookCondition;
