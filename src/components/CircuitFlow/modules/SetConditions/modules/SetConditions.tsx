import { FunctionComponent } from "react";
import MoreConditionButton from "./MoreConditionButton";
import AllConditions from "./AllConditions";
import { SetConditionsProps } from "@/components/CircuitFlow/types/circuitflow.types";
import ConditionSwitch from "./ConditionInput/ConditionSwitcher";
import Connector from "../../Common/Connector";
import ConditionType from "./ConditionInput/ConditionType";
import { INFURA_GATEWAY } from "../../../../../../lib/constants";
import Image from "next/legacy/image";
import { setPreviewCondition } from "../../../../../../redux/reducers/previewConditionModalSlice";

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
          <div className="relative w-fit h-fit flex ml-auto right-16">
            <Connector />
          </div>
          <MoreConditionButton
            handleAddConditionAndReset={handleAddConditionAndReset}
            editingState={editingState}
            handleUpdateCondition={handleUpdateCondition}
          />
        </div>
        <div
          className="justify-start items-center flex absolute w-7 h-6 cursor-pointer active:scale-95  mix-blend-hard-light left-20"
          onClick={() =>
            dispatch(
              setPreviewCondition({
                actionOpen: true,
                actionMessage: "Preview Your Conditions.",
              })
            )
          }
        >
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmWmrNXoHWnYkhnAvy6U2xDD4rdLJaBfGrPyLUyU6svZ9s`}
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
};

export default SetConditions;
