import { FunctionComponent } from "react";
import ContractCondition from "./ContractCondition";
import WebhookCondition from "./WebhookCondition";
import { ConditionSwitchProps } from "@/components/CircuitFlow/types/circuitflow.types";

const ConditionSwitch: FunctionComponent<ConditionSwitchProps> = ({
  conditionType,
}): JSX.Element => {
  switch (conditionType) {
    case "web":
      return <WebhookCondition />;

    default:
      return <ContractCondition />;
  }
};

export default ConditionSwitch;
