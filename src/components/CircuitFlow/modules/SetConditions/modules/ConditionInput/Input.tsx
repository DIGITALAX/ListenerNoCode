import { FunctionComponent } from "react";
import { WebhookConditionProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { setNewWebhookConditionInformation } from "../../../../../../../redux/reducers/newWebhookConditionInformationSlice";

const WebhookCondition: FunctionComponent<WebhookConditionProps> = ({
  newWebhookConditionInformation,
  matchFunctionsWebhook,
  setMatchFunctionsWebhook,
  dispatch,
}): JSX.Element => {
  return (
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
          dispatch(
            setNewWebhookConditionInformation({
              ...newWebhookConditionInformation!,
              baseUrl: e.target.value as any,
            })
          )
        }
      />
    </div>
  );
};

export default WebhookCondition;
