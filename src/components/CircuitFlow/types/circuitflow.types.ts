import { AnyAction, Dispatch } from "redux";
import {
  Action,
  Condition,
  ContractCondition,
  IConditionalLogic,
  IExecutionConstraints,
} from "./litlistener.types";

export type OverviewProps = {
  circuitFlowIndex: number;
  dispatch: Dispatch<AnyAction>;
};

export type CircuitSwitchProps = {
  circuitFlowIndex: number;
  dispatch: Dispatch<AnyAction>;
  circuitInformation: CircuitInformation | undefined;
  conditionType: string;
  setConditionType: (e: string) => void;
  newContractConditionInformation: ContractCondition | undefined;
  setNewContractConditionInformation: (e: ContractCondition) => void;
  handleAddConditionAndReset: () => void;
};

export type SetConditionsProps = {
  dispatch: Dispatch<AnyAction>;
  circuitInformation: CircuitInformation | undefined;
  conditionType: string;
  setConditionType: (e: string) => void;
  newContractConditionInformation: ContractCondition | undefined;
  setNewContractConditionInformation: (e: ContractCondition) => void;
  handleAddConditionAndReset: () => void;
};

export interface CircuitInformation {
  conditions: Condition[];
  conditionalLogic: IConditionalLogic;
  actions: Action[];
  executionConstraints: IExecutionConstraints;
  IPFSHash: String;
  PKP: {
    address: `0x${string}`;
    publicKey: `0x04${string}` | string;
  };
}

export type ConditionSwitchProps = {
  conditionType: string;
  newContractConditionInformation: ContractCondition | undefined;
  setNewContractConditionInformation: (e: ContractCondition) => void;
};

export type NextButtonProps = {
  circuitFlowIndex: number;
  dispatch: Dispatch<AnyAction>;
  text: string;
};

export type AllConditionsProps = {
  circuitInformation: CircuitInformation | undefined;
};

export type ConnectorProps = {
  topOnly?: boolean;
};

export type MoreConditionButtonProps = {
  handleAddConditionAndReset: () => void;
};

export type ConditionInputProps = {
  text: string;
};

export type ConditionTypeProps = {
  conditionType: string;
  setConditionType: (e: string) => void;
};

export type ContractConditionProps = {
  newContractConditionInformation: ContractCondition | undefined;
  setNewContractConditionInformation: (e: ContractCondition) => void;
};
