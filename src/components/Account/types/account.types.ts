import {
  Action,
  Condition,
  IConditionalLogic,
  IExecutionConstraints,
} from "@/components/CircuitFlow/types/litlistener.types";
import { AccessControlConditions } from "@lit-protocol/types";

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
  circuitsOpen: boolean;
  setCircuitsOpen: (e: boolean) => void;
  largeScreen: boolean;
};

export type SelectedCircuitProps = {
  interruptLoading: boolean;
  handleInterruptCircuit: (id: string) => Promise<void>;
  decryptFulfillment: () => Promise<void>;
  decryptLoading: boolean;
};

export interface Order {
  orderId: string;
  totalPrice: string;
  currency: string;
  postId: string;
  buyer: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  collection: {
    collectionId: string;
    price: string;
    amount: string;
    metadata: {
      images: string[];
      title: string;
    };
  };
  isFulfilled: boolean;
  status: Status;
  amount: string;
  details?: DecryptedDetails | EncryptedDetails | string;
  decrypted: boolean;
}

export enum Status {
  Fulfilled = "Fulfilled",
  Shipped = "Shipped",
  Shipping = "Shipping",
  Designing = "Designing",
}

export interface EncryptedDetails {
  ciphertext: string;
  dataToEncryptHash: string;
  accessControlConditions: AccessControlConditions | undefined;
  chainId: string;
}

export interface DecryptedDetails {
  name: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  country: string;
  color: string;
  size: string;
}

export interface Details {
  name: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  country: string;
}
