import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CircuitSwitch from "@/components/CircuitFlow/modules/Common/CircuitSwitch";
import Overview from "@/components/CircuitFlow/modules/Common/Overview";
import useSetConditions from "@/components/CircuitFlow/modules/SetConditions/hooks/useSetConditions";
import NextButton from "@/components/CircuitFlow/modules/Common/NextButton";
import useConditionalLogic from "@/components/CircuitFlow/modules/ConditionalLogic/hooks/useConditionalLogic";
import useExecutionConstraints from "@/components/CircuitFlow/modules/ExecutionConstraints/hooks/useExecutionConstraints";
import useIPFS from "@/components/CircuitFlow/modules/IPFSHash/hooks/useIPFS";
import usePKP from "@/components/CircuitFlow/modules/MintGrantBurnPKP/hooks/usePKP";
import useStartCircuit from "@/components/CircuitFlow/modules/StartCircuit/hooks/useStartCircuit";
import useSetActions from "@/components/CircuitFlow/modules/SetActions/hooks/useSetActions";

export default function Home() {
  const dispatch = useDispatch();
  const circuitFlowIndex = useSelector(
    (state: RootState) => state.app.circuitFlowReducer.value
  );
  const litActionCode = useSelector(
    (state: RootState) => state.app.litActionCodeReducer.value
  );
  const ipfsHash = useSelector(
    (state: RootState) => state.app.ipfsHashReducer.value
  );
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const newContractConditionInformation = useSelector(
    (state: RootState) => state.app.newContractConditionInformationReducer.value
  );
  const newWebhookConditionInformation = useSelector(
    (state: RootState) => state.app.newWebhookConditionInformationReducer.value
  );
  const newContractActionInformation = useSelector(
    (state: RootState) => state.app.newContractActionInformationReducer.value
  );
  const newFetchActionInformation = useSelector(
    (state: RootState) => state.app.newFetchActionInformationReducer.value
  );
  const {
    conditionType,
    setConditionType,
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
    editingState,
    setEditingState,
    handleUpdateCondition,
    matchFunctionsWebhook,
    setMatchFunctionsWebhook,
  } = useSetConditions();
  const {
    actionType,
    setActionType,
    handleAddActionAndReset,
    actionOutputs,
    setActionOutputs,
    actionInputs,
    setActionInputs,
    dropDownsOpenAction,
    setDropDownsOpenAction,
    functionArgs,
    setFunctionArgs,
    editingStateAction,
    setEditingStateAction,
    handleUpdateAction,
    payable,
    setPayable,
    stateMutability,
    setStateMutability,
    signConditions,
    setSignConditions
  } = useSetActions();
  const { ipfsLoading, handleHashToIPFS } = useIPFS();
  const { handleMintGrantBurnPKP, pkpLoading } = usePKP();
  const {
    handleAddExecutionConstraints,
    time,
    setTime,
    maxLitActionCompletions,
    setMaxLitActionCompletions,
    conditionMonitorExecutions,
    setConditionMonitorExecutions,
  } = useExecutionConstraints();
  const {
    logicType,
    setLogicType,
    handleSetConditionalLogic,
    thresholdValue,
    setThresholdValue,
    targetCondition,
    setTargetCondition,
    interval,
    setInterval,
    targetConditionOpen,
    setTargetConditionOpen,
  } = useConditionalLogic();
  const { handleRunCircuit, circuitRunning } = useStartCircuit();
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
        <div className="relative w-60 h-3/4 rounded-lg border-2 border-sol items-center justify-center flex bg-aBlack">
          <Image
            src={`${INFURA_GATEWAY}/ipfs/${
              circuitFlowIndex === 0
                ? "Qmb8nqNPpXRrJTLgKJtRF6n9AW7cvKojtRSBLsbGoD1Ug2"
                : circuitFlowIndex === 1
                ? "QmYbHNMXNxYsEBnrGmg2WKVH8H6NNJWq1eaMYG4myBcEwk"
                : circuitFlowIndex === 2
                ? "Qmds4rHdz5c1vafYoaoU77WW38JAwpJaYQ6wPV2EEVYZdt"
                : circuitFlowIndex === 3
                ? "Qmf1SAwfTX6nP54QAaahLNspBeyBginWMeApCG4U6skGRm"
                : circuitFlowIndex === 4
                ? "QmRmqEJTp2faMA3eqfUitLYGPLJYpLfZ6sC2VUKL6Cbsm9"
                : circuitFlowIndex === 5
                ? "QmSuaus6LZkx1mpuqEJFNtG65gAXHt2yXCx2dZKLn1bPx1"
                : "QmaYQxBhpB8DqkX6Z1swzDD6iUaWgPowz8428YNSK2XWK2"
            }`}
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
          matchFunctionsContract={matchFunctionsContract}
          setMatchFunctionsContract={setMatchFunctionsContract}
          newWebhookConditionInformation={newWebhookConditionInformation}
          editingState={editingState}
          setEditingState={setEditingState}
          handleUpdateCondition={handleUpdateCondition}
          matchFunctionsWebhook={matchFunctionsWebhook}
          setMatchFunctionsWebhook={setMatchFunctionsWebhook}
          logicType={logicType}
          setLogicType={setLogicType}
          thresholdValue={thresholdValue}
          setThresholdValue={setThresholdValue}
          targetCondition={targetCondition}
          setTargetCondition={setTargetCondition}
          interval={interval}
          setInterval={setInterval}
          targetConditionOpen={targetConditionOpen}
          setTargetConditionOpen={setTargetConditionOpen}
          time={time}
          setTime={setTime}
          maxLitActionCompletions={maxLitActionCompletions}
          setMaxLitActionCompletions={setMaxLitActionCompletions}
          conditionMonitorExecutions={conditionMonitorExecutions}
          setConditionMonitorExecutions={setConditionMonitorExecutions}
          handleHashToIPFS={handleHashToIPFS}
          ipfsHash={ipfsHash}
          ipfsLoading={ipfsLoading}
          litActionCode={litActionCode}
          pkpLoading={pkpLoading}
          handleMintGrantBurnPKP={handleMintGrantBurnPKP}
          circuitRunning={circuitRunning}
          handleRunCircuit={handleRunCircuit}
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
          handleAddActionAndReset={handleAddActionAndReset}
          handleUpdateAction={handleUpdateAction}
          setActionType={setActionType}
          setEditingStateAction={setEditingStateAction}
          editingStateAction={editingStateAction}
          signConditions={signConditions}
          setSignConditions={setSignConditions}
        />
        {circuitFlowIndex !== 6 && (
          <NextButton
            text={
              circuitFlowIndex === 0
                ? "conditional logic >>>"
                : circuitFlowIndex === 1
                ? "circuit actions >>>"
                : circuitFlowIndex === 2
                ? "execution constraints >>>"
                : circuitFlowIndex === 3
                ? "ipfs hash >>>"
                : circuitFlowIndex === 4
                ? "mintgrantburn pkp >>>"
                : "run circuit >>>"
            }
            dispatch={dispatch}
            circuitFlowIndex={circuitFlowIndex}
            circuitInformation={circuitInformation}
            handleSetConditionalLogic={handleSetConditionalLogic}
            handleAddExecutionConstraints={handleAddExecutionConstraints}
            ipfsHash={ipfsHash}
          />
        )}
      </div>
      <Overview
        dispatch={dispatch}
        circuitFlowIndex={circuitFlowIndex}
        circuitInformation={circuitInformation}
        handleSetConditionalLogic={handleSetConditionalLogic}
        handleAddExecutionConstraints={handleAddExecutionConstraints}
        ipfsHash={ipfsHash}
      />
    </div>
  );
}
