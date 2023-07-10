import { FunctionComponent } from "react";
import { SetActionsProps } from "../../types/circuitflow.types";
import AllActions from "./AllActions";
import ActionType from "./ActionInput/ActionType";
import Connector from "../Common/Connector";
import ActionSwitch from "./ActionInput/ActionSwitch";
import MoreActionButton from "./MoreActionButton";

const SetActions: FunctionComponent<SetActionsProps> = ({
  dispatch,
  circuitInformation,
  actionType,
  setActionType,
  newContractActionInformation,
  handleAddActionAndReset,
  actionOutputs,
  setActionOutputs,
  actionInputs,
  setActionInputs,
  dropDownsOpenAction,
  setDropDownsOpenAction,
  functionArgs,
  setFunctionArgs,
  newFetchActionInformation,
  editingStateAction,
  setEditingStateAction,
  handleUpdateAction,
  payable,
  setPayable,
  stateMutability,
  setStateMutability,
  signConditions,
  setSignConditions,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <AllActions
        dispatch={dispatch}
        circuitInformation={circuitInformation}
        setActionType={setActionType}
        setEditingStateAction={setEditingStateAction}
      />
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <ActionType
          editingStateAction={editingStateAction}
          setActionType={setActionType}
          actionType={actionType}
        />
        <Connector topOnly />
        <ActionSwitch
          dispatch={dispatch}
          actionType={actionType}
          newContractActionInformation={newContractActionInformation}
          newFetchActionInformation={newFetchActionInformation}
          actionOutputs={actionOutputs}
          setActionOutputs={setActionOutputs}
          actionInputs={actionInputs}
          setActionInputs={setActionInputs}
          dropDownsOpenAction={dropDownsOpenAction}
          setDropDownsOpenAction={setDropDownsOpenAction}
          functionArgs={functionArgs}
          setFunctionArgs={setFunctionArgs}
          payable={payable}
          setPayable={setPayable}
          stateMutability={stateMutability}
          setStateMutability={setStateMutability}
          signConditions={signConditions}
          setSignConditions={setSignConditions}
        />
      </div>
      <div className="relative flex flex-row w-full h-fit items-center">
        <div className="relative w-full h-fit flex flex-col gap-5 items-center justify-center">
          <div className="relative w-fit h-fit flex ml-auto right-16 top-2">
            <Connector />
          </div>
          <MoreActionButton
            handleAddActionAndReset={handleAddActionAndReset}
            editingStateAction={editingStateAction}
            handleUpdateAction={handleUpdateAction}
          />
        </div>
      </div>
    </div>
  );
};

export default SetActions;
