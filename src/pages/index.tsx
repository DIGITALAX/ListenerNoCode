import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CircuitSwitch from "@/components/CircuitFlow/modules/Common/CircuitSwitch";
import Overview from "@/components/CircuitFlow/modules/Common/Overview";
import useSetConditions from "@/components/CircuitFlow/modules/SetConditions/hooks/useSetConditions";
import NextButton from "@/components/CircuitFlow/modules/Common/NextButton";

export default function Home() {
  const dispatch = useDispatch();
  const circuitFlowIndex = useSelector(
    (state: RootState) => state.app.circuitFlowReducer.value
  );
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const {
    conditionType,
    setConditionType,
    newContractConditionInformation,
    setNewContractConditionInformation,
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
    matchFunctions,
    setMatchFunctions,
    newWebhookConditionInformation,
    setNewWebhookConditionInformation,
    editingState,
    setEditingState,
    handleUpdateCondition,
  } = useSetConditions();
  return (
    <div className="relative w-full h-full flex flex-row border-t-2 border-sol">
      <div className="absolute w-full h-full flex mix-blend-overlay">
        <Image
          src={`${INFURA_GATEWAY}/ipfs/QmZ3DdVrAmYaJTgXHu56eUGGLzLeQkhLeTc433wpxppu4S`}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
          draggable={false}
        />
      </div>
      <div className="absolute w-full h-full flex mix-blend-hard-light">
        <Image
          src={`${INFURA_GATEWAY}/ipfs/QmXiPMfdaEVsmArAdBjXyfytNZQt56R98iZxS94yRGxEXm`}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
          draggable={false}
        />
      </div>
      <div className="relative w-fit h-full flex gap-3 items-center justify-start pl-10">
        <div className="relative w-60 h-3/4 rounded-lg border-2 border-sol items-center justify-center flex">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/Qmb8nqNPpXRrJTLgKJtRF6n9AW7cvKojtRSBLsbGoD1Ug2`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            draggable={false}
          />
        </div>
      </div>
      <div className="relative w-full h-full flex flex-col gap-3 pb-3 px-3 justify-start">
        <CircuitSwitch
          dispatch={dispatch}
          circuitFlowIndex={circuitFlowIndex}
          circuitInformation={circuitInformation}
          conditionType={conditionType}
          setConditionType={setConditionType}
          newContractConditionInformation={newContractConditionInformation}
          setNewContractConditionInformation={
            setNewContractConditionInformation
          }
          handleAddConditionAndReset={handleAddConditionAndReset}
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
          matchFunctions={matchFunctions}
          setMatchFunctions={setMatchFunctions}
          setNewWebhookConditionInformation={setNewWebhookConditionInformation}
          newWebhookConditionInformation={newWebhookConditionInformation}
          editingState={editingState}
          setEditingState={setEditingState}
          handleUpdateCondition={handleUpdateCondition}
        />
        <NextButton
          text={
            circuitFlowIndex === 0
              ? "set circuit conditions"
              : circuitFlowIndex === 1
              ? "set conditional logic"
              : circuitFlowIndex === 2
              ? "set circuit actions"
              : circuitFlowIndex === 3
              ? "set execution constraints"
              : circuitFlowIndex === 4
              ? "hash to ipfs"
              : circuitFlowIndex === 5
              ? "mintgrantburn pkp"
              : "run circuit"
          }
          dispatch={dispatch}
          circuitFlowIndex={circuitFlowIndex}
        />
      </div>
      <Overview dispatch={dispatch} circuitFlowIndex={circuitFlowIndex} />
    </div>
  );
}
