import Image from "next/legacy/image";
import {
  INFURA_GATEWAY,
  SET_CONDITIONS_TEXT_CONTRACT,
  SET_CONDITIONS_TEXT_WEBHOOK,
} from "../../lib/constants";
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
import Head from "next/head";
import Steps from "@/components/CircuitFlow/modules/Common/Steps";
import { useEffect, useState } from "react";
import MoreConditionButton from "@/components/CircuitFlow/modules/SetConditions/modules/MoreConditionButton";

export default function Home() {
  const dispatch = useDispatch();
  const circuitFlowIndex = useSelector(
    (state: RootState) => state.app.circuitFlowReducer.value
  );
  const conditionFlowIndex = useSelector(
    (state: RootState) => state.app.conditionFlowReducer.value
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
  const signedPKPTx = useSelector(
    (state: RootState) => state.app.signedPKPReducer.value
  );
  const newFetchActionInformation = useSelector(
    (state: RootState) => state.app.newFetchActionInformationReducer.value
  );
  const [stepCount, setStepCount] = useState<number>(0);

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
    setSignConditions,
  } = useSetActions();
  const {
    ipfsLoading,
    handleInstantiateCircuit,
    handleSaveToIPFSDB,
    dbLoading,
    dbAdded,
  } = useIPFS();
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
  const {
    handleRunCircuit,
    circuitRunning,
    handleClearCircuit,
    circuitRunLoading,
  } = useStartCircuit();

  useEffect(() => {
    if (circuitFlowIndex === 0) {
      if (conditionType === "web") {
        console.log(conditionFlowIndex.webhookCount);
        setStepCount(conditionFlowIndex.webhookCount);
      } else {
        setStepCount(conditionFlowIndex.contractCount);
      }
    }
  }, [circuitFlowIndex]);

  return (
    <div className="relative w-full h-full flex flex-row border-t-2 border-sol">
      <Head>
        <title>No-Code Lit Listener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <div className="relative w-full h-full relative flex flex-col gap-2 items-center justify-center">
        <div className="relative w-full h-[90%] flex flex-row gap-4 items-center justify-center pt-3">
          <div className="relative w-fit h-full flex gap-3 items-center justify-start pl-10">
            <div className="relative w-60 h-100 rounded-lg border-2 border-sol items-center justify-center flex bg-aBlack">
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
          <div className="relative w-full h-100 flex flex-col px-3 justify-center items-center">
            <div className="relative h-full w-full flex flex-row items-center justify-center rounded-sm border-2 border-sol">
              <div className="absolute w-full h-full mix-blend-darken bg-aBlack opacity-70"></div>
              <div className="relative flex flex-col w-full h-full items-center justify-center">
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <CircuitSwitch
                    conditionFlowIndex={conditionFlowIndex}
                    dispatch={dispatch}
                    circuitFlowIndex={circuitFlowIndex}
                    circuitInformation={circuitInformation}
                    conditionType={conditionType}
                    setConditionType={setConditionType}
                    newContractConditionInformation={
                      newContractConditionInformation
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
                    matchFunctionsContract={matchFunctionsContract}
                    setMatchFunctionsContract={setMatchFunctionsContract}
                    newWebhookConditionInformation={
                      newWebhookConditionInformation
                    }
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
                    setConditionMonitorExecutions={
                      setConditionMonitorExecutions
                    }
                    handleInstantiateCircuit={handleInstantiateCircuit}
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
                    circuitRunLoading={circuitRunLoading}
                    handleClearCircuit={handleClearCircuit}
                    handleSaveToIPFSDB={handleSaveToIPFSDB}
                    dbLoading={dbLoading}
                    dbAdded={dbAdded}
                    signedPKPTx={signedPKPTx}
                  />
                </div>
                <Steps
                  circuitFlowIndex={circuitFlowIndex}
                  stepCount={stepCount}
                  dispatch={dispatch}
                  currentFlowIndex={conditionFlowIndex}
                />
              </div>
              <div className="relative flex flex-col flex-grow h-full items-center justify-center">
                <div className="relative w-full h-full flex flex-row items-center justify-center">
                  <div
                    className="relative w-full h-full flex items-center justify-center flex-col gap-2 px-3 py-4"
                    id="explainerBg"
                  >
                    <div
                      className="absolute w-full h-fit font-mine uppercase text-center justify-center items-center text-xl top-3.5 left-0"
                      id="explainerTitleGlow"
                    >
                      {circuitFlowIndex === 0
                        ? "Set Conditions"
                        : circuitFlowIndex === 1
                        ? "Conditional Logic"
                        : circuitFlowIndex === 2
                        ? "Set Actions"
                        : circuitFlowIndex === 3
                        ? "Execution Constraints"
                        : circuitFlowIndex === 4
                        ? "IPFS Hash"
                        : circuitFlowIndex === 5
                        ? "MintGrantBurn PKP"
                        : "Run Circuit"}
                    </div>
                    <div
                      className="relative w-full h-fit font-mine uppercase text-center justify-center items-center text-xl"
                      id="explainerTitle"
                    >
                      {circuitFlowIndex === 0
                        ? "Set Conditions"
                        : circuitFlowIndex === 1
                        ? "Conditional Logic"
                        : circuitFlowIndex === 2
                        ? "Set Actions"
                        : circuitFlowIndex === 3
                        ? "Execution Constraints"
                        : circuitFlowIndex === 4
                        ? "IPFS Hash"
                        : circuitFlowIndex === 5
                        ? "MintGrantBurn PKP"
                        : "Run Circuit"}
                    </div>
                    <div className="relative w-60 h-full items-start justify-start overflow-y-scroll flex">
                      <div
                        className="relative w-full h-60 items-start justify-start flex font-vcr text-ballena whitespace-pre-wrap break-words"
                        style={{wordBreak: "break-word"}}
                        dangerouslySetInnerHTML={{
                          __html:
                            circuitFlowIndex === 0
                              ? conditionType === "web"
                                ? SET_CONDITIONS_TEXT_WEBHOOK[
                                    conditionFlowIndex.index
                                  ]
                                : SET_CONDITIONS_TEXT_CONTRACT[
                                    conditionFlowIndex.index
                                  ]
                              : "",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                {circuitFlowIndex === 0 && (
                  <MoreConditionButton
                    handleAddConditionAndReset={handleAddConditionAndReset}
                    editingState={editingState}
                    handleUpdateCondition={handleUpdateCondition}
                    conditionFlowIndex={conditionFlowIndex}
                    conditionType={conditionType}
                    dispatch={dispatch}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex items-end justify-end pb-2 pr-3">
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
