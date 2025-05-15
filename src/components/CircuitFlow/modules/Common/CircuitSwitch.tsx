import { FunctionComponent, useContext } from "react";
import SetConditions from "../SetConditions/modules/SetConditions";
import ConditionalLogic from "../ConditionalLogic/ConditionalLogic";
import IPFS from "../IPFSHash/IPFS";
import MintGrantBurn from "../MintGrantBurnPKP/MintGrantBurn";
import RunCircuit from "../StartCircuit/RunCircuit";
import SetActions from "../SetActions/modules/SetActions";
import ExecutionConstraints from "../ExecutionConstraints/modules/ExecutionConstraints";
import { CircuitSwitchProps } from "../../types/circuitflow.types";
import { ModalContext } from "@/pages/_app";

const CircuitSwitch: FunctionComponent<CircuitSwitchProps> = ({
  setConditionType,
  conditionType,
  handleAddConditionAndReset,
  inputs,
  setInputs,
  dropDownsOpenContract,
  setDropDownsOpenContract,
  eventArgs,
  setEventArgs,
  editingState,
  handleUpdateCondition,
  logicType,
  setLogicType,
  thresholdValue,
  setThresholdValue,
  targetCondition,
  setTargetCondition,
  interval,
  setInterval,
  targetConditionOpen,
  setTargetConditionOpen,
  time,
  setTime,
  maxLitActionCompletions,
  setMaxLitActionCompletions,
  conditionMonitorExecutions,
  setConditionMonitorExecutions,
  ipfsLoading,
  handleInstantiateCircuit,
  handleMintGrantBurnPKP,
  pkpLoading,
  handleRunCircuit,
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
  serverLoaded,
  editingStateAction,
  handleUpdateAction,
  payable,
  setPayable,
  stateMutability,
  setStateMutability,
  signConditions,
  setSignConditions,
  handleClearCircuit,
  circuitRunLoading,
  handleSaveToIPFSDB,
  dbLoading,
  dbAdded,
  setDropDownChainContract,
  dropDownChainContract,
  apiPassword,
  setApiPassword,
  apiPasswordAction,
  setApiPasswordAction,
  dropDownChainContractAction,
  setDropDownChainContractAction,
  dropDownsSignOpen,
  setDropDownsSignOpen,
  switchNeeded,
  switchNeededPKP,
  expectedValues,
  setExpectedValues,
}): JSX.Element => {
  const context = useContext(ModalContext);
  switch (context?.circuitFlow) {
    case 6:
      return (
        <RunCircuit
          handleRunCircuit={handleRunCircuit}
          circuitRunLoading={circuitRunLoading}
          handleClearCircuit={handleClearCircuit}
        />
      );

    case 5:
      return (
        <MintGrantBurn
          pkpLoading={pkpLoading}
          handleMintGrantBurnPKP={handleMintGrantBurnPKP}
          switchNeededPKP={switchNeededPKP}
        />
      );

    case 4:
      return (
        <IPFS
          handleInstantiateCircuit={handleInstantiateCircuit}
          ipfsLoading={ipfsLoading}
          handleSaveToIPFSDB={handleSaveToIPFSDB}
          dbLoading={dbLoading}
          dbAdded={dbAdded}
          switchNeeded={switchNeeded}
          serverLoaded={serverLoaded}
        />
      );

    case 3:
      return (
        <ExecutionConstraints
          time={time}
          setTime={setTime}
          maxLitActionCompletions={maxLitActionCompletions}
          setMaxLitActionCompletions={setMaxLitActionCompletions}
          conditionMonitorExecutions={conditionMonitorExecutions}
          setConditionMonitorExecutions={setConditionMonitorExecutions}
        />
      );

    case 2:
      return (
        <SetActions
          dropDownsSignOpen={dropDownsSignOpen}
          setDropDownsSignOpen={setDropDownsSignOpen}
          apiPasswordAction={apiPasswordAction}
          setApiPasswordAction={setApiPasswordAction}
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
          setDropDownChainContractAction={setDropDownChainContractAction}
          dropDownChainContractAction={dropDownChainContractAction}
        />
      );

    case 1:
      return (
        <ConditionalLogic
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
        />
      );

    default:
      return (
        <SetConditions
          expectedValues={expectedValues}
          setExpectedValues={setExpectedValues}
          conditionType={conditionType}
          setConditionType={setConditionType}
          handleAddConditionAndReset={handleAddConditionAndReset}
          inputs={inputs}
          setInputs={setInputs}
          dropDownsOpenContract={dropDownsOpenContract}
          setDropDownsOpenContract={setDropDownsOpenContract}
          eventArgs={eventArgs}
          setEventArgs={setEventArgs}
          editingState={editingState}
          handleUpdateCondition={handleUpdateCondition}
          setDropDownChainContract={setDropDownChainContract}
          dropDownChainContract={dropDownChainContract}
          apiPassword={apiPassword}
          setApiPassword={setApiPassword}
        />
      );
  }
};

export default CircuitSwitch;
