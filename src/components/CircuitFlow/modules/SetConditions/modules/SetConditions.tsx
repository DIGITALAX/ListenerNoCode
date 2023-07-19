import { FunctionComponent } from "react";
import MoreConditionButton from "./MoreConditionButton";
import AllConditions from "./AllConditions";
import { SetConditionsProps } from "@/components/CircuitFlow/types/circuitflow.types";
import ConditionTypeSwitcher from "./ConditionInput/ConditionTypeSwitcher";
import Choice from "./ConditionInput/Choice";

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
  conditionFlowIndex,
}): JSX.Element => {
  switch (conditionFlowIndex) {
    default:
      return (
        <Choice
          editingState={editingState}
          setConditionType={setConditionType}
          conditionType={conditionType}
        />
      );
  }

  // <div className="relative w-full h-full flex flex-col p-1.5">
  {
    /*       
      <AllConditions
        dispatch={dispatch}
        circuitInformation={circuitInformation}
        setConditionType={setConditionType}
        setEditingState={setEditingState}
      />
      <div className="relative w-full h-full flex flex-row items-center justify-center">
    
        <ConditionTypeSwitcher
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
      
  }
  {
    /* </div> */
  }
};

export default SetConditions;
