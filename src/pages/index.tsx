import Image from "next/legacy/image";
import {
  EXECUTION_CONSTRAINTS_TEXT,
  INFURA_GATEWAY,
  IPFS_TEXT,
  MINT_BURN_TEXT,
  RUN_CIRCUIT_TEXT,
  SET_ACTIONS_TEXT_CONTRACT,
  SET_ACTIONS_TEXT_FETCH,
  SET_CONDITIONAL_LOGIC_TEXT_EVERY,
  SET_CONDITIONAL_LOGIC_TEXT_TARGET,
  SET_CONDITIONAL_LOGIC_TEXT_THRESHOLD,
  SET_CONDITIONS_TEXT_CONTRACT,
  SET_CONDITIONS_TEXT_WEBHOOK,
} from "../../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CircuitSwitch from "@/components/CircuitFlow/modules/Common/CircuitSwitch";
import Overview from "@/components/CircuitFlow/modules/Common/Overview";
import useSetConditions from "@/components/CircuitFlow/modules/SetConditions/hooks/useSetConditions";
import useConditionalLogic from "@/components/CircuitFlow/modules/ConditionalLogic/hooks/useConditionalLogic";
import useExecutionConstraints from "@/components/CircuitFlow/modules/ExecutionConstraints/hooks/useExecutionConstraints";
import useIPFS from "@/components/CircuitFlow/modules/IPFSHash/hooks/useIPFS";
import usePKP from "@/components/CircuitFlow/modules/MintGrantBurnPKP/hooks/usePKP";
import useStartCircuit from "@/components/CircuitFlow/modules/StartCircuit/hooks/useStartCircuit";
import useSetActions from "@/components/CircuitFlow/modules/SetActions/hooks/useSetActions";
import Head from "next/head";
import Steps from "@/components/CircuitFlow/modules/Common/Steps";
import { useEffect, useState } from "react";
import NextButton from "@/components/CircuitFlow/modules/Common/NextButton";
import { setConditionFlow } from "../../redux/reducers/conditionFlowSlice";
import AllConditions from "@/components/CircuitFlow/modules/SetConditions/modules/AllConditions";
import { setConditionLogicFlow } from "../../redux/reducers/conditionLogicFlowSlice";
import AllActions from "@/components/CircuitFlow/modules/SetActions/modules/AllActions";
import { setActionFlow } from "../../redux/reducers/actionFlowSlice";
import { setExecutionConstraintFlow } from "../../redux/reducers/executionConstraintFlowSlice";
import { setIpfsFlow } from "../../redux/reducers/ipfsFlowSlice";
import { setMintPKPFlow } from "../../redux/reducers/mintPKPFlowSlice";
import { setRunCircuit } from "../../redux/reducers/runCircuitFlowSlice";
import { useRouter } from "next/router";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import useServerConnect from "@/components/CircuitFlow/hooks/useServerConnect";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { address } = useAccount();
  const { openChainModal } = useChainModal();
  const { openConnectModal } = useConnectModal();
  const circuitFlowIndex = useSelector(
    (state: RootState) => state.app.circuitFlowReducer.value
  );
  const circuitRunning = useSelector(
    (state: RootState) => state.app.circuitRunningReducer.value
  );
  const conditionFlowIndex = useSelector(
    (state: RootState) => state.app.conditionFlowReducer.value
  );
  const actionFlowIndex = useSelector(
    (state: RootState) => state.app.actionFlowReducer.value
  );
  const runCircuitFlowIndex = useSelector(
    (state: RootState) => state.app.runCircuitFlowReducer.value
  );
  const conditionLogicFlowIndex = useSelector(
    (state: RootState) => state.app.conditionLogicFlowReducer.value
  );
  const mintPKPFlowIndex = useSelector(
    (state: RootState) => state.app.mintPKPFlowReducer.value
  );
  const ipfsFlowIndex = useSelector(
    (state: RootState) => state.app.ipfsFlowReducer.value
  );
  const executionConstraintFlowIndex = useSelector(
    (state: RootState) => state.app.executionConstraintFlowReducer.value
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
  const [largeOverview, setLargeOverview] = useState<boolean>(true);
  const [largeScreen, setLargeScreen] = useState<number>(0);

  const {
    conditionType,
    setConditionType,
    handleAddConditionAndReset,
    apiPassword,
    setApiPassword,
    inputs,
    setInputs,
    dropDownsOpenContract,
    setDropDownsOpenContract,
    eventArgs,
    setEventArgs,
    expectedValues,
    setExpectedValues,
    editingState,
    setEditingState,
    handleUpdateCondition,
    setDropDownChainContract,
    dropDownChainContract,
    text,
    setText,
    overviewOpen,
    setOverviewOpen,
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
    setDropDownChainContractAction,
    dropDownChainContractAction,
    apiPasswordAction,
    setApiPasswordAction,
    dropDownsSignOpen,
    setDropDownsSignOpen,
  } = useSetActions();
  const {
    ipfsLoading,
    handleInstantiateCircuit,
    handleSaveToIPFSDB,
    dbLoading,
    dbAdded,
    switchNeeded,
  } = useIPFS();
  const { handleMintGrantBurnPKP, pkpLoading, switchNeededPKP } = usePKP();
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
  const { handleRunCircuit, handleClearCircuit, circuitRunLoading } =
    useStartCircuit();

  useEffect(() => {
    setText(
      circuitFlowIndex === 0
        ? conditionType === "web"
          ? SET_CONDITIONS_TEXT_WEBHOOK[conditionFlowIndex.index]
          : SET_CONDITIONS_TEXT_CONTRACT[conditionFlowIndex.index]
        : circuitFlowIndex === 1
        ? conditionType === "EVERY"
          ? SET_CONDITIONAL_LOGIC_TEXT_EVERY[conditionLogicFlowIndex.index]
          : conditionType === "THRESHOLD"
          ? SET_CONDITIONAL_LOGIC_TEXT_THRESHOLD[conditionLogicFlowIndex.index]
          : SET_CONDITIONAL_LOGIC_TEXT_TARGET[conditionLogicFlowIndex.index]
        : circuitFlowIndex === 2
        ? actionType === "fetch"
          ? SET_ACTIONS_TEXT_FETCH[actionFlowIndex.index]
          : SET_ACTIONS_TEXT_CONTRACT[actionFlowIndex.index]
        : circuitFlowIndex === 3
        ? EXECUTION_CONSTRAINTS_TEXT[executionConstraintFlowIndex.index]
        : circuitFlowIndex === 4
        ? IPFS_TEXT[ipfsFlowIndex.index]
        : circuitFlowIndex === 5
        ? MINT_BURN_TEXT[0]
        : circuitRunning
        ? RUN_CIRCUIT_TEXT[2]
        : circuitRunLoading
        ? RUN_CIRCUIT_TEXT[1]
        : RUN_CIRCUIT_TEXT[0]
    );
  }, [
    circuitRunLoading,
    circuitRunning,
    circuitFlowIndex,
    ipfsFlowIndex.index,
    executionConstraintFlowIndex.index,
    actionFlowIndex.index,
    conditionLogicFlowIndex.index,
    conditionFlowIndex.index,
    actionType,
    conditionType,
  ]);

  useEffect(() => {
    if (circuitFlowIndex === 0) {
      if (conditionType === "web") {
        setStepCount(conditionFlowIndex.webhookCount);
      } else {
        setStepCount(conditionFlowIndex.contractCount);
      }
      dispatch(
        setConditionFlow({
          index: 0,
          contractCount: conditionFlowIndex.contractCount,
          webhookCount: conditionFlowIndex.webhookCount,
        })
      );
    } else if (circuitFlowIndex === 1) {
      if (logicType === "EVERY") {
        setStepCount(conditionLogicFlowIndex.everyCount);
      } else if (logicType === "THRESHOLD") {
        setStepCount(conditionLogicFlowIndex.thresholdCount);
      } else {
        setStepCount(conditionLogicFlowIndex.targetCount);
      }
      dispatch(
        setConditionLogicFlow({
          index: 0,
          everyCount: conditionLogicFlowIndex.everyCount,
          targetCount: conditionLogicFlowIndex.targetCount,
          thresholdCount: conditionLogicFlowIndex.thresholdCount,
        })
      );
    } else if (circuitFlowIndex === 2) {
      if (actionType === "fetch") {
        setStepCount(actionFlowIndex.fetchCount);
      } else {
        setStepCount(actionFlowIndex.contractCount);
      }

      dispatch(
        setActionFlow({
          index: 0,
          contractCount: actionFlowIndex.contractCount,
          fetchCount: actionFlowIndex.fetchCount,
        })
      );
    } else if (circuitFlowIndex === 3) {
      setStepCount(executionConstraintFlowIndex.executionCount);
      dispatch(
        setExecutionConstraintFlow({
          index: 0,
          executionCount: executionConstraintFlowIndex.executionCount,
        })
      );
    } else if (circuitFlowIndex === 4) {
      setStepCount(ipfsFlowIndex.ipfsCount);
      dispatch(
        setIpfsFlow({
          index: 0,
          ipfsCount: ipfsFlowIndex.ipfsCount,
        })
      );
    } else if (circuitFlowIndex === 5) {
      setStepCount(mintPKPFlowIndex.mintPKPCount);
      dispatch(
        setMintPKPFlow({
          index: 0,
          mintPKPCount: mintPKPFlowIndex.mintPKPCount,
        })
      );
    } else if (circuitFlowIndex === 6) {
      setStepCount(runCircuitFlowIndex.circuitCount);
      dispatch(
        setRunCircuit({
          index: 0,
          circuitCount: runCircuitFlowIndex.circuitCount,
        })
      );
    }
  }, [circuitFlowIndex, conditionType, logicType, actionType]);

  useEffect(() => {
    const handleResize = () => {
      setLargeScreen(window.innerWidth > 940 ? 10 : 8);
      setLargeOverview(Boolean(window.innerWidth > 820));
      if (Boolean(window.innerWidth < 820)) {
        setOverviewOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const { handleServerConnect } = useServerConnect();

  return (
    <div
      className="relative w-full flex flex-row border-t-2 border-sol grow overflow-y-scroll"
      id={largeOverview ? "heightCheckout" : ""}
      style={{ height: largeOverview ? "" : "65rem" }}
    >
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

      <div className="relative w-full min-h-100 flex items-center justify-center grow">
        <div className="relative w-full h-full flex flex-row gap-4 items-center justify-center py-3">
          <div className="relative w-fit h-full hidden max:flex gap-3 items-center justify-start pl-10">
            <div className="relative w-60 h-full grow rounded-lg border-2 border-sol items-center justify-center flex bg-aBlack">
              <Image
                src={`${INFURA_GATEWAY}/ipfs/${"Qmb8nqNPpXRrJTLgKJtRF6n9AW7cvKojtRSBLsbGoD1Ug2"}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                draggable={false}
              />
            </div>
          </div>
          {/* <div className="text-white" onClick={() => handleServerConnect()}>
            here
          </div> */}
          <div className="relative w-full h-full grow flex flex-col px-3 justify-center items-center">
            <div className="relative h-full w-full flex items-center justify-start renewed:py-0 renewed:justify-center rounded-sm renewed:border-2 renewed:border-sol renewed:flex-row flex-col">
              <div className="absolute w-full h-full mix-blend-darken bg-aBlack opacity-70"></div>
              <div className="relative flex flex-col w-full items-center justify-center h-full">
                <div className="relative w-full h-full flex flex-col items-start galaxy:items-center justify-center renewed:overflow-auto overflow-scroll p-10 galaxy:px-0 galaxy:py-4">
                  <CircuitSwitch
                    apiPasswordAction={apiPasswordAction}
                    setApiPasswordAction={setApiPasswordAction}
                    setDropDownChainContractAction={
                      setDropDownChainContractAction
                    }
                    dropDownChainContractAction={dropDownChainContractAction}
                    actionFlowIndex={actionFlowIndex}
                    conditionFlowIndex={conditionFlowIndex}
                    dispatch={dispatch}
                    circuitFlowIndex={circuitFlowIndex}
                    circuitInformation={circuitInformation}
                    conditionType={conditionType}
                    setConditionType={setConditionType}
                    newContractConditionInformation={
                      newContractConditionInformation
                    }
                    address={Boolean(address)}
                    openConnectModal={openConnectModal}
                    litActionCode={ipfsHash.litCode}
                    dropDownsSignOpen={dropDownsSignOpen}
                    setDropDownsSignOpen={setDropDownsSignOpen}
                    handleAddConditionAndReset={handleAddConditionAndReset}
                    apiPassword={apiPassword}
                    setApiPassword={setApiPassword}
                    inputs={inputs}
                    setInputs={setInputs}
                    dropDownsOpenContract={dropDownsOpenContract}
                    setDropDownsOpenContract={setDropDownsOpenContract}
                    eventArgs={eventArgs}
                    setEventArgs={setEventArgs}
                    expectedValues={expectedValues}
                    setExpectedValues={setExpectedValues}
                    newWebhookConditionInformation={
                      newWebhookConditionInformation
                    }
                    executionConstraintFlowIndex={executionConstraintFlowIndex}
                    editingState={editingState}
                    handleUpdateCondition={handleUpdateCondition}
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
                    switchNeededPKP={switchNeededPKP}
                    switchNeeded={switchNeeded}
                    openChainModal={openChainModal}
                    handleInstantiateCircuit={handleInstantiateCircuit}
                    ipfsHash={ipfsHash.ipfs}
                    ipfsLoading={ipfsLoading}
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
                    editingStateAction={editingStateAction}
                    signConditions={signConditions}
                    setSignConditions={setSignConditions}
                    circuitRunLoading={circuitRunLoading}
                    handleClearCircuit={handleClearCircuit}
                    handleSaveToIPFSDB={handleSaveToIPFSDB}
                    dbLoading={dbLoading}
                    dbAdded={dbAdded}
                    signedPKPTx={signedPKPTx}
                    setDropDownChainContract={setDropDownChainContract}
                    dropDownChainContract={dropDownChainContract}
                    conditionLogicFlowIndex={conditionLogicFlowIndex}
                    ipfsFlowIndex={ipfsFlowIndex}
                  />
                  {circuitInformation?.conditions?.length > 0 &&
                  circuitFlowIndex === 0 ? (
                    <div className="absolute bottom-0 left-0 bg-black w-full h-12 border border-ballena px-2">
                      <AllConditions
                        dispatch={dispatch}
                        circuitInformation={circuitInformation}
                        setConditionType={setConditionType}
                        setEditingState={setEditingState}
                        conditionFlowIndex={conditionFlowIndex}
                      />
                    </div>
                  ) : (
                    circuitInformation?.actions?.length > 0 &&
                    circuitFlowIndex === 2 && (
                      <div className="absolute bottom-0 left-0 bg-black w-full h-12 border border-ballena px-2">
                        <AllActions
                          dispatch={dispatch}
                          circuitInformation={circuitInformation}
                          setActionType={setActionType}
                          setEditingStateAction={setEditingStateAction}
                          actionFlowIndex={actionFlowIndex}
                        />
                      </div>
                    )
                  )}
                </div>
                <div className="relative w-full h-16 hidden renewed:flex">
                  <Steps
                    largeScreen={largeScreen}
                    stepCount={stepCount}
                    currentFlowIndex={
                      circuitFlowIndex === 0
                        ? conditionFlowIndex
                        : circuitFlowIndex === 1
                        ? conditionLogicFlowIndex
                        : circuitFlowIndex === 2
                        ? actionFlowIndex
                        : circuitFlowIndex === 3
                        ? executionConstraintFlowIndex
                        : circuitFlowIndex === 4
                        ? ipfsFlowIndex
                        : circuitFlowIndex === 5
                        ? mintPKPFlowIndex
                        : runCircuitFlowIndex
                    }
                    increaseStepFunction={
                      circuitFlowIndex === 0
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setConditionFlow({
                                  index: index,
                                  webhookCount: conditionFlowIndex.webhookCount,
                                  contractCount:
                                    conditionFlowIndex.contractCount,
                                })
                              );
                          }
                        : circuitFlowIndex === 1
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setConditionLogicFlow({
                                  index: index,
                                  thresholdCount:
                                    conditionLogicFlowIndex.thresholdCount,
                                  everyCount:
                                    conditionLogicFlowIndex.everyCount,
                                  targetCount:
                                    conditionLogicFlowIndex.targetCount,
                                })
                              );
                          }
                        : circuitFlowIndex === 2
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setActionFlow({
                                  index: index,
                                  fetchCount: actionFlowIndex.fetchCount,
                                  contractCount: actionFlowIndex.contractCount,
                                })
                              );
                          }
                        : circuitFlowIndex === 3
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setExecutionConstraintFlow({
                                  index: index,
                                  executionCount:
                                    executionConstraintFlowIndex.executionCount,
                                })
                              );
                          }
                        : circuitFlowIndex === 4
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setIpfsFlow({
                                  index: index,
                                  ipfsCount: ipfsFlowIndex.ipfsCount,
                                })
                              );
                          }
                        : circuitFlowIndex === 5
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setMintPKPFlow({
                                  index: index,
                                  mintPKPCount: mintPKPFlowIndex.mintPKPCount,
                                })
                              );
                          }
                        : (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setRunCircuit({
                                  index: index,
                                  circuitCount:
                                    runCircuitFlowIndex.circuitCount,
                                })
                              );
                          }
                    }
                  />
                </div>
                <div className="relative w-full renewed:w-fit h-60 renewed:h-full flex flex-row items-center justify-center renewed:hidden overflow-y-scroll">
                  <div
                    className="relative w-full renewed:w-fit h-full flex items-center justify-center flex-col gap-2 px-3 py-4"
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
                    <div className="relative w-full renewed:w-60 h-full items-start justify-start overflow-y-scroll flex">
                      <div
                        className="relative w-full h-60 items-start justify-start flex font-vcr text-ballena whitespace-pre-wrap break-words"
                        style={{ wordBreak: "break-word" }}
                        dangerouslySetInnerHTML={{
                          __html: text,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col flex-col grow h-fit w-full renewed:w-auto renewed:h-full items-center justify-center">
                <div className="relative w-full h-full hidden renewed:flex flex-row items-center justify-center">
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
                        style={{ wordBreak: "break-word" }}
                        dangerouslySetInnerHTML={{
                          __html: text,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-16 flex renewed:hidden">
                  <Steps
                    largeScreen={largeScreen}
                    stepCount={stepCount}
                    currentFlowIndex={
                      circuitFlowIndex === 0
                        ? conditionFlowIndex
                        : circuitFlowIndex === 1
                        ? conditionLogicFlowIndex
                        : circuitFlowIndex === 2
                        ? actionFlowIndex
                        : circuitFlowIndex === 3
                        ? executionConstraintFlowIndex
                        : circuitFlowIndex === 4
                        ? ipfsFlowIndex
                        : circuitFlowIndex === 5
                        ? mintPKPFlowIndex
                        : runCircuitFlowIndex
                    }
                    increaseStepFunction={
                      circuitFlowIndex === 0
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setConditionFlow({
                                  index: index,
                                  webhookCount: conditionFlowIndex.webhookCount,
                                  contractCount:
                                    conditionFlowIndex.contractCount,
                                })
                              );
                          }
                        : circuitFlowIndex === 1
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setConditionLogicFlow({
                                  index: index,
                                  thresholdCount:
                                    conditionLogicFlowIndex.thresholdCount,
                                  everyCount:
                                    conditionLogicFlowIndex.everyCount,
                                  targetCount:
                                    conditionLogicFlowIndex.targetCount,
                                })
                              );
                          }
                        : circuitFlowIndex === 2
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setActionFlow({
                                  index: index,
                                  fetchCount: actionFlowIndex.fetchCount,
                                  contractCount: actionFlowIndex.contractCount,
                                })
                              );
                          }
                        : circuitFlowIndex === 3
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setExecutionConstraintFlow({
                                  index: index,
                                  executionCount:
                                    executionConstraintFlowIndex.executionCount,
                                })
                              );
                          }
                        : circuitFlowIndex === 4
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setIpfsFlow({
                                  index: index,
                                  ipfsCount: ipfsFlowIndex.ipfsCount,
                                })
                              );
                          }
                        : circuitFlowIndex === 5
                        ? (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setMintPKPFlow({
                                  index: index,
                                  mintPKPCount: mintPKPFlowIndex.mintPKPCount,
                                })
                              );
                          }
                        : (index: number) => {
                            index < stepCount &&
                              dispatch(
                                setRunCircuit({
                                  index: index,
                                  circuitCount:
                                    runCircuitFlowIndex.circuitCount,
                                })
                              );
                          }
                    }
                  />
                </div>
                <NextButton
                  handleClearCircuit={handleClearCircuit}
                  conditionFlowIndex={conditionFlowIndex}
                  conditionLogicFlowIndex={conditionLogicFlowIndex}
                  dispatch={dispatch}
                  circuitFlowIndex={circuitFlowIndex}
                  circuitInformation={circuitInformation}
                  handleSetConditionalLogic={handleSetConditionalLogic}
                  handleAddExecutionConstraints={handleAddExecutionConstraints}
                  ipfsHash={ipfsHash.ipfs}
                  stepCount={stepCount}
                  actionFlowIndex={actionFlowIndex}
                  executionConstraintFlowIndex={executionConstraintFlowIndex}
                  ipfsFlowIndex={ipfsFlowIndex}
                  signedPKPTx={signedPKPTx}
                  mintPKPFlowIndex={mintPKPFlowIndex}
                  circuitRunning={circuitRunning}
                  router={router}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Overview
        handleClearCircuit={handleClearCircuit}
        dispatch={dispatch}
        circuitFlowIndex={circuitFlowIndex}
        circuitInformation={circuitInformation}
        handleSetConditionalLogic={handleSetConditionalLogic}
        handleAddExecutionConstraints={handleAddExecutionConstraints}
        ipfsHash={ipfsHash.ipfs}
        circuitRunning={circuitRunning}
        overviewOpen={overviewOpen}
        setOverviewOpen={setOverviewOpen}
        largeScreen={largeOverview}
      />
    </div>
  );
}
