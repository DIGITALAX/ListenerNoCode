import { FunctionComponent } from "react";
import { CircuitSwitchProps } from "../../types/circuitflow.types";
import SetConditions from "../SetConditions/modules/SetConditions";
import ConditionalLogic from "../ConditionalLogic/ConditionalLogic";
import IPFS from "../IPFSHash/IPFS";
import MintGrantBurn from "../MintGrantBurnPKP/MintGrantBurn";
import RunCircuit from "../StartCircuit/RunCircuit";
import SetActions from "../SetActions/modules/SetActions";
import ExecutionConstraints from "../ExecutionConstraints/modules/ExecutionConstraints";

const CircuitSwitch: FunctionComponent<CircuitSwitchProps> = ({
  circuitFlowIndex,
  dispatch,
  circuitInformation,
  setConditionType,
  conditionType,
  newContractConditionInformation,
  handleAddConditionAndReset,
  inputs,
  setInputs,
  dropDownsOpenContract,
  setDropDownsOpenContract,
  eventArgs,
  setEventArgs,
  expectedValues,
  setExpectedValues,
  newWebhookConditionInformation,
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
  ipfsHash,
  ipfsLoading,
  handleInstantiateCircuit,
  handleMintGrantBurnPKP,
  pkpLoading,
  handleRunCircuit,
  circuitRunning,
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
  serverLoaded,
  newFetchActionInformation,
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
  signedPKPTx,
  conditionFlowIndex,
  setDropDownChainContract,
  dropDownChainContract,
  apiPassword,
  setApiPassword,
  conditionLogicFlowIndex,
  actionFlowIndex,
  apiPasswordAction,
  setApiPasswordAction,
  dropDownChainContractAction,
  setDropDownChainContractAction,
  dropDownsSignOpen,
  setDropDownsSignOpen,
  executionConstraintFlowIndex,
  litActionCode,
  switchNeeded,
  openChainModal,
  ipfsFlowIndex,
  switchNeededPKP,
  address,
  openConnectModal
}): JSX.Element => {
  switch (circuitFlowIndex) {
    case 6:
      return (
        <RunCircuit
          handleRunCircuit={handleRunCircuit}
          circuitRunning={circuitRunning}
          circuitRunLoading={circuitRunLoading}
          handleClearCircuit={handleClearCircuit}
        />
      );

    case 5:
      return (
        <MintGrantBurn
          pkpLoading={pkpLoading}
          handleMintGrantBurnPKP={handleMintGrantBurnPKP}
          signedPKPTx={signedPKPTx}
          switchNeededPKP={switchNeededPKP}
          openChainModal={openChainModal}
        />
      );

    case 4:
      return (
        <IPFS
          handleInstantiateCircuit={handleInstantiateCircuit}
          ipfsHash={ipfsHash}
          ipfsLoading={ipfsLoading}
          handleSaveToIPFSDB={handleSaveToIPFSDB}
          dbLoading={dbLoading}
          dbAdded={dbAdded}
          litActionCode={litActionCode}
          ipfsFlowIndex={ipfsFlowIndex}
          switchNeeded={switchNeeded}
          openChainModal={openChainModal}
          address={address}
          openConnectModal={openConnectModal}
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
          executionConstraintFlowIndex={executionConstraintFlowIndex}
        />
      );

    case 2:
      return (
        <SetActions
          dropDownsSignOpen={dropDownsSignOpen}
          setDropDownsSignOpen={setDropDownsSignOpen}
          apiPasswordAction={apiPasswordAction}
          setApiPasswordAction={setApiPasswordAction}
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
          handleAddActionAndReset={handleAddActionAndReset}
          handleUpdateAction={handleUpdateAction}
          setActionType={setActionType}
          editingStateAction={editingStateAction}
          circuitInformation={circuitInformation}
          signConditions={signConditions}
          setSignConditions={setSignConditions}
          actionFlowIndex={actionFlowIndex}
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
          circuitInformation={circuitInformation}
          conditionLogicFlowIndex={conditionLogicFlowIndex}
        />
      );

    default:
      return (
        <SetConditions
          conditionFlowIndex={conditionFlowIndex}
          dispatch={dispatch}
          conditionType={conditionType}
          setConditionType={setConditionType}
          newContractConditionInformation={newContractConditionInformation}
          handleAddConditionAndReset={handleAddConditionAndReset}
          inputs={inputs}
          setInputs={setInputs}
          dropDownsOpenContract={dropDownsOpenContract}
          setDropDownsOpenContract={setDropDownsOpenContract}
          eventArgs={eventArgs}
          setEventArgs={setEventArgs}
          expectedValues={expectedValues}
          setExpectedValues={setExpectedValues}
          newWebhookConditionInformation={newWebhookConditionInformation}
          editingState={editingState}
          handleUpdateCondition={handleUpdateCondition}
          setDropDownChainContract={setDropDownChainContract}
          dropDownChainContract={dropDownChainContract}
          apiPassword={apiPassword}
          setApiPassword={setApiPassword}
          circuitInformation={circuitInformation}
        />
      );
  }
};

export default CircuitSwitch;
