import { AnyAction, Dispatch } from "redux";
import {
  Action,
  Condition,
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
  newConditionInformation: Condition | undefined;
  setNewConditionInformation: (e: Condition) => void;
};

export type SetConditionsProps = {
  dispatch: Dispatch<AnyAction>;
  circuitInformation: CircuitInformation | undefined;
  conditionType: string;
  setConditionType: (e: string) => void;
  newConditionInformation: Condition | undefined;
  setNewConditionInformation: (e: Condition) => void;
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
  dispatch: Dispatch<AnyAction>;
  circuitInformation: CircuitInformation | undefined;
  newConditionInformation: Condition | undefined;
};

export type ConditionInputProps = {
  text: string;
};

export type ConditionTypeProps = {
  conditionType: string;
  setConditionType: (e: string) => void;
};
