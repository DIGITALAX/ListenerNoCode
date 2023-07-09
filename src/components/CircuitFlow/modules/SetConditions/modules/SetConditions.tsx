import { FunctionComponent } from "react";
import MoreConditionButton from "./MoreConditionButton";
import AllConditions from "./AllConditions";
import { SetConditionsProps } from "@/components/CircuitFlow/types/circuitflow.types";
import ConditionSwitch from "./ConditionInput/ConditionSwitcher";
import Connector from "../../Common/Connector";
import ConditionType from "./ConditionInput/ConditionType";

const SetConditions: FunctionComponent<SetConditionsProps> = ({
  dispatch,
  circuitInformation,
  conditionType,
  setConditionType,
  newContractConditionInformation,
  setNewContractConditionInformation,
  handleAddConditionAndReset,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <AllConditions circuitInformation={circuitInformation} />
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <ConditionType
          setConditionType={setConditionType}
          conditionType={conditionType}
        />
        <Connector topOnly />
        <ConditionSwitch
          conditionType={conditionType}
          newContractConditionInformation={newContractConditionInformation}
          setNewContractConditionInformation={
            setNewContractConditionInformation
          }
        />
      </div>
      <div className="relative w-full h-fit flex flex-col gap-5 items-center justify-center">
        <div className="relative w-fit h-fit flex ml-auto right-16">
          <Connector />
        </div>
        <MoreConditionButton
          handleAddConditionAndReset={handleAddConditionAndReset}
        />
      </div>
    </div>
  );
};

export default SetConditions;
