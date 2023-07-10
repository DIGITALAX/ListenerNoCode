import { FunctionComponent } from "react";
import { CircuitSwitchProps } from "../../types/circuitflow.types";
import SetConditions from "../SetConditions/modules/SetConditions";
import ConditionalLogic from "../ConditionalLogic/ConditionalLogic";
import ExecutionConstraints from "../ExecutionConstraints/ExecutionConstraints";
import IPFS from "../IPFSHash/IPFS";
import MintGrantBurn from "../MintGrantBurnPKP/MintGrantBurn";
import RunCircuit from "../StartCircuit/RunCircuit";
import SetActions from "../SetActions/SetActions";

const CircuitSwitch: FunctionComponent<CircuitSwitchProps> = ({
  circuitFlowIndex,
  dispatch,
  circuitInformation,
  setConditionType,
  conditionType,
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
  handleHashToIPFS,
  litActionCode,
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
  switch (circuitFlowIndex) {
    case 6:
      return (
        <RunCircuit
          circuitInformation={circuitInformation}
          handleRunCircuit={handleRunCircuit}
          circuitRunning={circuitRunning}
          ipfsHash={ipfsHash}
        />
      );

    case 5:
      return (
        <MintGrantBurn
          pkpLoading={pkpLoading}
          handleMintGrantBurnPKP={handleMintGrantBurnPKP}
          circuitInformation={circuitInformation}
        />
      );

    case 4:
      return (
        <IPFS
          litActionCode={litActionCode}
          dispatch={dispatch}
          handleHashToIPFS={handleHashToIPFS}
          ipfsHash={ipfsHash}
          ipfsLoading={ipfsLoading}
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
          setEditingStateAction={setEditingStateAction}
          editingStateAction={editingStateAction}
          circuitInformation={circuitInformation}
          signConditions={signConditions}
          setSignConditions={setSignConditions}
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
        />
      );

    default:
      return (
        <SetConditions
          circuitInformation={circuitInformation}
          dispatch={dispatch}
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
        />
      );
  }
};

export default CircuitSwitch;
