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
import { useContext, useEffect, useState } from "react";
import NextButton from "@/components/CircuitFlow/modules/Common/NextButton";
import AllConditions from "@/components/CircuitFlow/modules/SetConditions/modules/AllConditions";
import AllActions from "@/components/CircuitFlow/modules/SetActions/modules/AllActions";
import { ModalContext } from "./_app";

export default function Home() {
  const context = useContext(ModalContext);
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
    serverLoaded,
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
      context?.circuitFlow === 0
        ? conditionType === "web"
          ? SET_CONDITIONS_TEXT_WEBHOOK[context?.conditionFlow?.index]
          : SET_CONDITIONS_TEXT_CONTRACT[context?.conditionFlow?.index]
        : context?.circuitFlow === 1
        ? conditionType === "EVERY"
          ? SET_CONDITIONAL_LOGIC_TEXT_EVERY[context?.conditionLogicFlow?.index]
          : conditionType === "THRESHOLD"
          ? SET_CONDITIONAL_LOGIC_TEXT_THRESHOLD[
              context?.conditionLogicFlow?.index
            ]
          : SET_CONDITIONAL_LOGIC_TEXT_TARGET[
              context?.conditionLogicFlow?.index
            ]
        : context?.circuitFlow === 2
        ? actionType === "fetch"
          ? SET_ACTIONS_TEXT_FETCH[context?.actionFlow?.index]
          : SET_ACTIONS_TEXT_CONTRACT[context?.actionFlow?.index]
        : context?.circuitFlow === 3
        ? EXECUTION_CONSTRAINTS_TEXT[context?.executionConstraintFlow?.index]
        : context?.circuitFlow === 4
        ? IPFS_TEXT[context?.ipfsFlow?.index]
        : context?.circuitFlow === 5
        ? MINT_BURN_TEXT[0]
        : context?.circuitRunning
        ? RUN_CIRCUIT_TEXT[2]
        : circuitRunLoading
        ? RUN_CIRCUIT_TEXT[1]
        : RUN_CIRCUIT_TEXT[0]
    );
  }, [
    circuitRunLoading,
    context?.circuitRunning,
    context?.circuitFlow,
    context?.ipfsFlow.index,
    context?.executionConstraintFlow.index,
    context?.actionFlow.index,
    context?.conditionLogicFlow?.index,
    context?.conditionFlow.index,
    actionType,
    conditionType,
  ]);

  useEffect(() => {
    if (context?.circuitFlow === 0) {
      if (conditionType === "web") {
        setStepCount(context?.conditionFlow?.webhookCount);
      } else {
        setStepCount(context?.conditionFlow?.contractCount);
      }

      context?.setConditionFlow((prev) => ({
        ...prev,
        index: 0,
      }));
    } else if (context?.circuitFlow === 1) {
      if (logicType === "EVERY") {
        setStepCount(context?.conditionLogicFlow?.everyCount);
      } else if (logicType === "THRESHOLD") {
        setStepCount(context?.conditionLogicFlow?.thresholdCount);
      } else {
        setStepCount(context?.conditionLogicFlow?.targetCount);
      }

      context?.setConditionLogicFlow((prev) => ({
        ...prev,
        index: 0,
      }));
    } else if (context?.circuitFlow === 2) {
      if (actionType === "fetch") {
        setStepCount(context?.actionFlow?.fetchCount);
      } else {
        setStepCount(context?.actionFlow?.contractCount);
      }

      context?.setActionFlow((prev) => ({
        ...prev,
        index: 0,
      }));
    } else if (context?.circuitFlow === 3) {
      setStepCount(context?.executionConstraintFlow?.executionCount);

      context?.setExecutionConstraintFlow({
        index: 0,
        executionCount: context?.executionConstraintFlow?.executionCount,
      });
    } else if (context?.circuitFlow === 4) {
      setStepCount(context?.ipfsFlow?.ipfsCount);

      context?.setIpfsFlow((prev) => ({
        ...prev,
        index: 0,
      }));
    } else if (context?.circuitFlow === 5) {
      setStepCount(context?.mintPKPFlow?.mintPKPCount);

      context?.setMintPKPFlow((prev) => ({
        ...prev,
        index: 0,
      }));
    } else if (context?.circuitFlow === 6) {
      setStepCount(context?.runCircuit?.circuitCount);

      context?.setRunCircuit((prev) => ({
        ...prev,
        index: 0,
      }));
    }
  }, [context?.circuitFlow, conditionType, logicType, actionType]);

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


  return (
    <div className="relative w-full h-fit flex flex-row border-t-2 border-sol grow overflow-y-scroll">
      <Head>
        <title>No-Code Lit Listener</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="og:image"
          content="https://listener.irrevocable.dev/card.png/"
        />
      </Head>
      <div
        className="absolute w-full h-full flex mix-blend-overlay"
        id={largeOverview ? "heightCheckout" : ""}
      >
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
                    setExpectedValues={setExpectedValues}
                    dropDownChainContractAction={dropDownChainContractAction}
                    conditionType={conditionType}
                    setConditionType={setConditionType}
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
                    serverLoaded={serverLoaded}
                    setTime={setTime}
                    maxLitActionCompletions={maxLitActionCompletions}
                    setMaxLitActionCompletions={setMaxLitActionCompletions}
                    conditionMonitorExecutions={conditionMonitorExecutions}
                    setConditionMonitorExecutions={
                      setConditionMonitorExecutions
                    }
                    switchNeededPKP={switchNeededPKP}
                    switchNeeded={switchNeeded}
                    handleInstantiateCircuit={handleInstantiateCircuit}
                    ipfsLoading={ipfsLoading}
                    pkpLoading={pkpLoading}
                    handleMintGrantBurnPKP={handleMintGrantBurnPKP}
                    handleRunCircuit={handleRunCircuit}
                    actionType={actionType}
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
                    setDropDownChainContract={setDropDownChainContract}
                    dropDownChainContract={dropDownChainContract}
                  />
                  {Number(context?.circuitInformation?.conditions?.length) >
                    0 && context?.circuitFlow === 0 ? (
                    <div className="absolute bottom-0 left-0 bg-black w-full h-12 border border-ballena px-2">
                      <AllConditions
                        setConditionType={setConditionType}
                        setEditingState={setEditingState}
                      />
                    </div>
                  ) : (
                    Number(context?.circuitInformation?.actions?.length) > 0 &&
                    context?.circuitFlow === 2 && (
                      <div className="absolute bottom-0 left-0 bg-black w-full h-12 border border-ballena px-2">
                        <AllActions
                          setActionType={setActionType}
                          setEditingStateAction={setEditingStateAction}
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
                      context?.circuitFlow === 0
                        ? context?.conditionFlow
                        : context?.circuitFlow === 1
                        ? context?.conditionLogicFlow
                        : context?.circuitFlow === 2
                        ? context?.actionFlow
                        : context?.circuitFlow === 3
                        ? context?.executionConstraintFlow
                        : context?.circuitFlow === 4
                        ? context?.ipfsFlow
                        : context?.circuitFlow === 5
                        ? context?.mintPKPFlow
                        : context?.runCircuit
                    }
                    increaseStepFunction={
                      context?.circuitFlow === 0
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setConditionFlow((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                        : context?.circuitFlow === 1
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setConditionLogicFlow((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                        : context?.circuitFlow === 2
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setActionFlow((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                        : context?.circuitFlow === 3
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setExecutionConstraintFlow((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                        : context?.circuitFlow === 4
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setIpfsFlow((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                        : context?.circuitFlow === 5
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setMintPKPFlow((prev) => ({
                                ...prev,
                                index: index,
                              }));
                          }
                        : (index: number) => {
                            index < stepCount &&
                              context?.setRunCircuit((prev) => ({
                                ...prev,
                                index: index,
                              }));
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
                      {context?.circuitFlow === 0
                        ? "Set Conditions"
                        : context?.circuitFlow === 1
                        ? "Conditional Logic"
                        : context?.circuitFlow === 2
                        ? "Set Actions"
                        : context?.circuitFlow === 3
                        ? "Execution Constraints"
                        : context?.circuitFlow === 4
                        ? "IPFS Hash"
                        : context?.circuitFlow === 5
                        ? "MintGrantBurn PKP"
                        : "Run Circuit"}
                    </div>
                    <div
                      className="relative w-full h-fit font-mine uppercase text-center justify-center items-center text-xl"
                      id="explainerTitle"
                    >
                      {context?.circuitFlow === 0
                        ? "Set Conditions"
                        : context?.circuitFlow === 1
                        ? "Conditional Logic"
                        : context?.circuitFlow === 2
                        ? "Set Actions"
                        : context?.circuitFlow === 3
                        ? "Execution Constraints"
                        : context?.circuitFlow === 4
                        ? "IPFS Hash"
                        : context?.circuitFlow === 5
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
                      {context?.circuitFlow === 0
                        ? "Set Conditions"
                        : context?.circuitFlow === 1
                        ? "Conditional Logic"
                        : context?.circuitFlow === 2
                        ? "Set Actions"
                        : context?.circuitFlow === 3
                        ? "Execution Constraints"
                        : context?.circuitFlow === 4
                        ? "IPFS Hash"
                        : context?.circuitFlow === 5
                        ? "MintGrantBurn PKP"
                        : "Run Circuit"}
                    </div>
                    <div
                      className="relative w-full h-fit font-mine uppercase text-center justify-center items-center text-xl"
                      id="explainerTitle"
                    >
                      {context?.circuitFlow === 0
                        ? "Set Conditions"
                        : context?.circuitFlow === 1
                        ? "Conditional Logic"
                        : context?.circuitFlow === 2
                        ? "Set Actions"
                        : context?.circuitFlow === 3
                        ? "Execution Constraints"
                        : context?.circuitFlow === 4
                        ? "IPFS Hash"
                        : context?.circuitFlow === 5
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
                      context?.circuitFlow === 0
                        ? context?.conditionFlow
                        : context?.circuitFlow === 1
                        ? context?.conditionLogicFlow
                        : context?.circuitFlow === 2
                        ? context?.actionFlow
                        : context?.circuitFlow === 3
                        ? context?.executionConstraintFlow
                        : context?.circuitFlow === 4
                        ? context?.ipfsFlow
                        : context?.circuitFlow === 5
                        ? context?.mintPKPFlow
                        : context?.runCircuit
                    }
                    increaseStepFunction={
                      context?.circuitFlow === 0
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setConditionFlow((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                        : context?.circuitFlow === 1
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setConditionLogicFlow((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                        : context?.circuitFlow === 2
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setActionFlow((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                        : context?.circuitFlow === 3
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setExecutionConstraintFlow((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                        : context?.circuitFlow === 4
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setIpfsFlow((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                        : context?.circuitFlow === 5
                        ? (index: number) => {
                            index < stepCount &&
                              context?.setMintPKPFlow((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                        : (index: number) => {
                            index < stepCount &&
                              context?.setRunCircuit((prev) => ({
                                ...prev,
                                index,
                              }));
                          }
                    }
                  />
                </div>
                <NextButton
                  handleClearCircuit={handleClearCircuit}
                  handleSetConditionalLogic={handleSetConditionalLogic}
                  handleAddExecutionConstraints={handleAddExecutionConstraints}
                  stepCount={stepCount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Overview
        handleClearCircuit={handleClearCircuit}
        handleSetConditionalLogic={handleSetConditionalLogic}
        handleAddExecutionConstraints={handleAddExecutionConstraints}
        overviewOpen={overviewOpen}
        setOverviewOpen={setOverviewOpen}
        largeScreen={largeOverview}
      />
    </div>
  );
}
