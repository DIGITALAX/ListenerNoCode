import { FunctionComponent } from "react";
import ContractAction from "./ContractAction";
import FetchAction from "./FetchAction";
import { ActionSwitchProps } from "@/components/CircuitFlow/types/circuitflow.types";

const ActionSwitch: FunctionComponent<ActionSwitchProps> = ({
  actionType,
  actionOutputs,
  setActionOutputs,
  actionInputs,
  setActionInputs,
  dropDownsOpenAction,
  setDropDownsOpenAction,
  functionArgs,
  setFunctionArgs,
  newContractActionInformation,
  newFetchActionInformation,
  dispatch,
  payable,
  setPayable,
  stateMutability,
  setStateMutability,
  signConditions,
  setSignConditions,
}): JSX.Element => {
  switch (actionType) {
    case "fetch":
      return (
        <FetchAction
          dispatch={dispatch}
          newFetchActionInformation={newFetchActionInformation}
          signConditions={signConditions}
          setSignConditions={setSignConditions}
          setDropDownsOpenAction={setDropDownsOpenAction}
          dropDownsOpenAction={dropDownsOpenAction}
        />
      );

    default:
      return (
        <ContractAction
          dispatch={dispatch}
          newContractActionInformation={newContractActionInformation}
          actionOutputs={actionOutputs}
          setActionOutputs={setActionOutputs}
          actionInputs={actionInputs}
          setActionInputs={setActionInputs}
          dropDownsOpenAction={dropDownsOpenAction}
          setDropDownsOpenAction={setDropDownsOpenAction}
          functionArgs={functionArgs}
          setFunctionArgs={setFunctionArgs}
          payable={payable}
          stateMutability={stateMutability}
          setPayable={setPayable}
          setStateMutability={setStateMutability}
        />
      );
  }
};

export default ActionSwitch;
