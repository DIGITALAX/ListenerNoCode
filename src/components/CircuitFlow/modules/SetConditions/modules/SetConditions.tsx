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
  handleAddConditionAndReset,
  outputs,
  setOutputs,
  inputs,
  setInputs,
  dropDownsOpenContract,
  setDropDownsOpenContract,
  eventArgs,
  setEventArgs,
  expectedValues,
  setExpectedValues,
  matchFunctionsContract,
  setMatchFunctionsContract,
  newWebhookConditionInformation,
  editingState,
  setEditingState,
  handleUpdateCondition,
  matchFunctionsWebhook,
  setMatchFunctionsWebhook,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <AllConditions
        dispatch={dispatch}
        circuitInformation={circuitInformation}
        setConditionType={setConditionType}
        setEditingState={setEditingState}
      />
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <ConditionType
          editingState={editingState}
          setConditionType={setConditionType}
          conditionType={conditionType}
        />
        <Connector topOnly />
        <ConditionSwitch
          dispatch={dispatch}
          conditionType={conditionType}
          newContractConditionInformation={newContractConditionInformation}
          newWebhookConditionInformation={newWebhookConditionInformation}
          outputs={outputs}
          setOutputs={setOutputs}
          inputs={inputs}
          setInputs={setInputs}
          dropDownsOpenContract={dropDownsOpenContract}
          setDropDownsOpenContract={setDropDownsOpenContract}
          eventArgs={eventArgs}
          setEventArgs={setEventArgs}
          expectedValues={expectedValues}
          setExpectedValues={setExpectedValues}
          matchFunctionsContract={matchFunctionsContract}
          setMatchFunctionsContract={setMatchFunctionsContract}
          matchFunctionsWebhook={matchFunctionsWebhook}
          setMatchFunctionsWebhook={setMatchFunctionsWebhook}
        />
      </div>
      <div className="relative flex flex-row w-full h-fit items-center">
        <div className="relative w-full h-fit flex flex-col gap-5 items-center justify-center">
          <div className="relative w-fit h-fit flex ml-auto right-16 top-2">
            <Connector />
          </div>
          <MoreConditionButton
            handleAddConditionAndReset={handleAddConditionAndReset}
            editingState={editingState}
            handleUpdateCondition={handleUpdateCondition}
          />
        </div>
      </div>
    </div>
  );
};

export default SetConditions;
