import {
  Action,
  Condition,
  IConditionalLogic,
  IExecutionConstraints,
} from "@/components/CircuitFlow/types/litlistener.types";
import { AnyAction, Dispatch } from "redux";

export interface AllCircuits {
  circuitId: string;
  monitorExecutions: number;
  circuitExecutions: number;
  blockTimestamp: string;
  completed: boolean;
  interrupted: boolean;
  circuitInformation: {
    id: string;
    tokenId: string;
    pkpPublicKey: string;
    pkpAddress: string;
    ipfs: string;
    instantiatorAddress: string;
    information: {
      circuitConditions: Condition[];
      circuitActions: Action[];
      conditionalLogic: IConditionalLogic;
      executionConstraints: IExecutionConstraints;
    };
  };
}

export interface SelectedCircuit {
  instantiatorAddress: string;
  listenerDBContract: string;
  transactionHash: string;
  circuitInformation: {
    id: string;
    tokenId: string;
    pkpPublicKey: string;
    pkpAddress: string;
    ipfs: string;
    instantiatorAddress: string;
    information: {
      circuitConditions: Condition[];
      circuitActions: Action[];
      conditionalLogic: IConditionalLogic;
      executionConstraints: IExecutionConstraints;
    };
  };
  circuitId: string;
  blockTimestamp: string;
  blockNumber: string;
  logs: {
    stringifiedLogs: {
      category: string;
      message: string;
      responseObject: string;
      isoDate: string;
    }[];
    circuitId: string;
    listenerDBContract: string;
    blockTimestamp: string;
    blockNumber: string;
    instantiatorAddress: string;
    transactionHash: string;
    monitorExecutions: number;
    circuitExecutions: number;
  };
  completed: {
    blockTimestamp: string;
    circuitId: string;
    hashedId: string;
    instantiatorAddress: string;
    listenerDBContract: string;
    transactionHash: string;
    blockNumber: string;
  };
  interrupted: {
    circuitId: string;
    hashedId: string;
    instantiatorAddress: string;
    listenerDBContract: string;
    transactionHash: string;
    blockTimestamp: string;
    blockNumber: string;
  };
}

export interface Interrupted {
  circuitId: string;
  hashedId: string;
  instantiatorAddress: string;
  listenerDBContract: string;
  transactionHash: string;
  blockTimestamp: string;
  blockNumber: string;
}

export interface Completed {
  blockTimestamp: string;
  circuitId: string;
  hashedId: string;
  instantiatorAddress: string;
  listenerDBContract: string;
  transactionHash: string;
  blockNumber: string;
}

export type AllCircuitsProps = {
  allUserCircuits: AllCircuits[];
  selectedCircuitSideBar: string;
  dispatch: Dispatch<AnyAction>;
  circuitsOpen: boolean;
  setCircuitsOpen: (e: boolean) => void;
  largeScreen: boolean;
};

export type SelectedCircuitProps = {
  selectedCircuit: SelectedCircuit | undefined;
  interruptLoading: boolean;
  handleInterruptCircuit: (id: string) => Promise<void>;
};
