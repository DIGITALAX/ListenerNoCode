import { AnyAction, Dispatch } from "redux";
import {
  Action,
  Condition,
  ContractCondition,
  IConditionalLogic,
  IExecutionConstraints,
  WebhookCondition,
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
  newWebhookConditionInformation: WebhookCondition | undefined;
  setNewWebhookConditionInformation: (e: WebhookCondition) => void;
  newContractConditionInformation: ContractCondition | undefined;
  setNewContractConditionInformation: (e: ContractCondition) => void;
  handleAddConditionAndReset: () => void;
  inputs: {
    indexed: boolean;
    internalType: string;
    name: string;
    type: string;
  }[];
  outputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  setInputs: (
    e: {
      indexed: boolean;
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  setOutputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  dropDownsOpenContract: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    indexed: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
  };
  setDropDownsOpenContract: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    indexed: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
  }) => void;
  eventArgs: string[];
  setEventArgs: (e: string[]) => void;
  expectedValues: string[];
  setExpectedValues: (e: string[]) => void;
  matchFunctionsContract: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  };
  setMatchFunctionsContract: (e: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  }) => void;
  editingState: boolean;
  setEditingState: (e: boolean) => void;
  handleUpdateCondition: () => void;
};

export type SetConditionsProps = {
  dispatch: Dispatch<AnyAction>;
  circuitInformation: CircuitInformation | undefined;
  conditionType: string;
  setConditionType: (e: string) => void;
  newWebhookConditionInformation: WebhookCondition | undefined;
  setNewWebhookConditionInformation: (e: WebhookCondition) => void;
  newContractConditionInformation: ContractCondition | undefined;
  setNewContractConditionInformation: (e: ContractCondition) => void;
  handleAddConditionAndReset: () => void;
  inputs: {
    indexed: boolean;
    internalType: string;
    name: string;
    type: string;
  }[];
  outputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  setInputs: (
    e: {
      indexed: boolean;
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  setOutputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  dropDownsOpenContract: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    indexed: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
  };
  setDropDownsOpenContract: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    indexed: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
  }) => void;
  eventArgs: string[];
  setEventArgs: (e: string[]) => void;
  expectedValues: string[];
  setExpectedValues: (e: string[]) => void;
  matchFunctionsContract: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  };
  setMatchFunctionsContract: (e: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  }) => void;
  editingState: boolean;
  setEditingState: (e: boolean) => void;
  handleUpdateCondition: () => void;
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
  newWebhookConditionInformation: WebhookCondition | undefined;
  setNewWebhookConditionInformation: (e: WebhookCondition) => void;
  newContractConditionInformation: ContractCondition | undefined;
  setNewContractConditionInformation: (e: ContractCondition) => void;
  inputs: {
    indexed: boolean;
    internalType: string;
    name: string;
    type: string;
  }[];
  outputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  setInputs: (
    e: {
      indexed: boolean;
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  setOutputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  dropDownsOpenContract: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    indexed: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
  };
  setDropDownsOpenContract: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    indexed: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
  }) => void;
  eventArgs: string[];
  setEventArgs: (e: string[]) => void;
  expectedValues: string[];
  setExpectedValues: (e: string[]) => void;
  matchFunctionsContract: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  };
  setMatchFunctionsContract: (e: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  }) => void;
};

export type NextButtonProps = {
  circuitFlowIndex: number;
  dispatch: Dispatch<AnyAction>;
  text: string;
};

export type AllConditionsProps = {
  circuitInformation: CircuitInformation | undefined;
  dispatch: Dispatch<AnyAction>;
  setNewContractConditionInformation: (e: ContractCondition) => void;
  setNewWebhookConditionInformation: (e: WebhookCondition) => void;
  setConditionType: (e: string) => void;
  setEditingState: (e: boolean) => void;
};

export type ConnectorProps = {
  topOnly?: boolean;
};

export type MoreConditionButtonProps = {
  handleAddConditionAndReset: () => void;
  editingState: boolean;
  handleUpdateCondition: () => void;
};

export type ConditionInputProps = {
  text: string;
};

export type ConditionTypeProps = {
  conditionType: string;
  setConditionType: (e: string) => void;
  editingState: boolean;
};

export type ContractConditionProps = {
  newContractConditionInformation: ContractCondition | undefined;
  setNewContractConditionInformation: (e: ContractCondition) => void;
  inputs: {
    indexed: boolean;
    internalType: string;
    name: string;
    type: string;
  }[];
  outputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  setInputs: (
    e: {
      indexed: boolean;
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  setOutputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  dropDownsOpenContract: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    indexed: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
  };
  setDropDownsOpenContract: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    indexed: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
  }) => void;
  eventArgs: string[];
  setEventArgs: (e: string[]) => void;
  expectedValues: string[];
  setExpectedValues: (e: string[]) => void;
  matchFunctionsContract: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  };
  setMatchFunctionsContract: (e: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  }) => void;
};

export type WebhookConditionProps = {
  newWebhookConditionInformation: WebhookCondition | undefined;
  setNewWebhookConditionInformation: (e: WebhookCondition) => void;
};
