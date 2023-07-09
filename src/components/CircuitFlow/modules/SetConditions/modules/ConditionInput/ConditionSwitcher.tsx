import { FunctionComponent } from "react";
import ContractCondition from "./ContractCondition";
import WebhookCondition from "./WebhookCondition";
import { ConditionSwitchProps } from "@/components/CircuitFlow/types/circuitflow.types";

const ConditionSwitch: FunctionComponent<ConditionSwitchProps> = ({
  conditionType,
  newContractConditionInformation,
  setNewContractConditionInformation,
}): JSX.Element => {
  switch (conditionType) {
    case "web":
      return <WebhookCondition />;

    default:
      return (
        <ContractCondition
          newContractConditionInformation={newContractConditionInformation}
          setNewContractConditionInformation={
            setNewContractConditionInformation
          }
        />
      );
  }
};

export default ConditionSwitch;
