import { FunctionComponent } from "react";
import ConditionInput from "./ConditionInput";
import Connector from "../../../Common/Connector";
import { WebhookConditionProps } from "@/components/CircuitFlow/types/circuitflow.types";

const WebhookCondition: FunctionComponent<WebhookConditionProps> = ({
  newWebhookConditionInformation,
  setNewWebhookConditionInformation,
}): JSX.Element => {
  return (
    <div className="relative flex flex-row items-center justify-center w-fit h-fit">
      <div
        className="relative w-60 h-60 flex flex-col p-2 gap-3"
        id="inputBorder"
      >
        <ConditionInput text="Enter API base URL, endpoint, value path and an API Key if required." />
        <div className="flex flex-col w-full h-full border-4 border-moda"></div>
      </div>
      <Connector topOnly />
      <div
        className="relative w-60 h-60 flex flex-col p-2 gap-3"
        id="inputBorder"
      >
        <ConditionInput text="Enter expected value and match operator and match functions." />
        <div className="flex flex-col w-full h-full border-4 border-moda"></div>
      </div>
    </div>
  );
};

export default WebhookCondition;
