import { AnyAction, Dispatch } from "redux";
import {
  Action,
  Condition,
  ContractAction,
  ContractCondition,
  FetchAction,
  IConditionalLogic,
  IExecutionConstraints,
  WebhookCondition,
} from "./litlistener.types";

export type OverviewProps = {
  circuitFlowIndex: number;
  dispatch: Dispatch<AnyAction>;
  circuitInformation: CircuitInformation;
  handleSetConditionalLogic: () => boolean;
  handleAddExecutionConstraints: () => void;
  ipfsHash: string;
};

export type CircuitSwitchProps = {
  conditionFlowIndex: {
    index: number;
    contractCount: number;
    webhookCount: number;
  };
  apiPassword: boolean;
  setApiPassword: (e: boolean) => void;
  circuitFlowIndex: number;
  dbLoading: boolean;
  dbAdded: boolean;
  handleSaveToIPFSDB: () => Promise<void>;
  handleClearCircuit: () => void;
  circuitRunLoading: boolean;
  dispatch: Dispatch<AnyAction>;
  signConditions: {
    type: string;
    operator: string;
    value: boolean | number | string;
    valueType: boolean | number | string;
  }[];
  setSignConditions: (
    e: {
      type: string;
      operator: string;
      value: boolean | number | string;
      valueType: boolean | number | string;
    }[]
  ) => void;
  handleAddActionAndReset: () => void;
  handleUpdateAction: () => void;
  editingStateAction: boolean;
  actionInputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  actionOutputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  setActionInputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  setActionOutputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  dropDownsOpenAction: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
    signType: boolean[];
    valueType: boolean[];
  };
  setDropDownsOpenAction: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
    signType: boolean[];
    valueType: boolean[];
  }) => void;
  functionArgs: string[];
  setFunctionArgs: (e: string[]) => void;
  newContractActionInformation: ContractAction | undefined;
  newFetchActionInformation: FetchAction | undefined;
  payable: boolean;
  setPayable: (e: boolean) => void;
  stateMutability: string;
  setStateMutability: (e: string) => void;
  actionType: string;
  setActionType: (e: string) => void;
  setEditingStateAction: (e: boolean) => void;
  handleRunCircuit: () => Promise<void>;
  circuitRunning: boolean;
  handleMintGrantBurnPKP: () => Promise<void>;
  pkpLoading: boolean;
  handleInstantiateCircuit: () => Promise<void>;
  litActionCode: string;
  ipfsLoading: boolean;
  ipfsHash: string;
  time: {
    startDate: string | undefined;
    endDate: string | undefined;
  };
  setTime: (e: {
    startDate: string | undefined;
    endDate: string | undefined;
  }) => void;
  maxLitActionCompletions: number | undefined;
  setMaxLitActionCompletions: (e: number | undefined) => void;
  conditionMonitorExecutions: number | undefined;
  setConditionMonitorExecutions: (e: number | undefined) => void;
  targetConditionOpen: boolean;
  setTargetConditionOpen: (e: boolean) => void;
  circuitInformation: CircuitInformation;
  conditionType: string;
  setConditionType: (e: string) => void;
  newWebhookConditionInformation: WebhookCondition | undefined;
  newContractConditionInformation: ContractCondition | undefined;
  handleAddConditionAndReset: () => void;
  inputs: {
    indexed: boolean;
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
  editingState: boolean;
  setEditingState: (e: boolean) => void;
  handleUpdateCondition: () => void;
  setLogicType: (e: string) => void;
  logicType: string;
  thresholdValue: number;
  setThresholdValue: (e: number) => void;
  targetCondition: number;
  setTargetCondition: (e: number) => void;
  interval: number;
  setInterval: (e: number) => void;
  signedPKPTx: {
    tokenId: string;
    publicKey: string;
    address: string;
  };
  setDropDownChainContract: (e: boolean) => void;
  dropDownChainContract: boolean;
};

export type SetConditionsProps = {
  apiPassword: boolean;
  setApiPassword: (e: boolean) => void;
  editingState: boolean;
  setEditingState: (e: boolean) => void;
  handleUpdateCondition: () => void;
  conditionFlowIndex: {
    index: number;
    contractCount: number;
    webhookCount: number;
  };
  inputs: {
    indexed: boolean;
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
  dispatch: Dispatch<AnyAction>;
  circuitInformation: CircuitInformation;
  conditionType: string;
  setConditionType: (e: string) => void;
  newWebhookConditionInformation: WebhookCondition | undefined;
  newContractConditionInformation: ContractCondition | undefined;
  handleAddConditionAndReset: () => void;
  eventArgs: string[];
  setEventArgs: (e: string[]) => void;
  expectedValues: string[];
  setExpectedValues: (e: string[]) => void;
  setDropDownChainContract: (e: boolean) => void;
  dropDownChainContract: boolean;
};

export interface CircuitInformation {
  id: string | undefined;
  conditions: Condition[];
  conditionalLogic: IConditionalLogic;
  actions: Action[];
  executionConstraints: IExecutionConstraints;
  IPFSHash: String;
  providerURL?: string;
}

export type AllConditionsProps = {
  circuitInformation: CircuitInformation;
  dispatch: Dispatch<AnyAction>;
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
  conditionFlowIndex: {
    index: number;
    webhookCount: number;
    contractCount: number;
  };
  circuitFlowIndex: number;
  conditionType: string;
  dispatch: Dispatch<AnyAction>;
  circuitInformation: CircuitInformation;
  handleAddExecutionConstraints: () => void;
  handleSetConditionalLogic: () => boolean;
  ipfsHash: string | undefined;
  stepCount: number;
};

export type InputProps = {
  text: string[];
  onChangeFunction: ((e: string) => void)[];
  changedValue: (string | undefined)[];
  count: number;
  placeholderText: string[];
  password?: boolean;
  setAPIPassword?: (e: boolean) => void;
};

export type ConditionChoiceProps = {
  conditionType: string;
  setConditionType: (e: string) => void;
  editingState: boolean;
};

export type WebhookConditionProps = {
  newWebhookConditionInformation: WebhookCondition | undefined;
  dispatch: Dispatch<AnyAction>;
};

export type LogicOptionsProps = {
  setLogicType: (e: string) => void;
  logicType: string;
};

export type IntervalProps = {
  interval: number;
  setInterval: (e: number) => void;
};

export type ThresholdProps = {
  thresholdValue: number;
  setThresholdValue: (e: number) => void;
};

export type TargetProps = {
  targetCondition: number;
  setTargetCondition: (e: number) => void;
  targetConditionOpen: boolean;
  setTargetConditionOpen: (e: boolean) => void;
  circuitInformation: CircuitInformation;
};

export type ConditionalLogicProps = {
  setLogicType: (e: string) => void;
  logicType: string;
  thresholdValue: number;
  setThresholdValue: (e: number) => void;
  targetCondition: number;
  setTargetCondition: (e: number) => void;
  interval: number;
  setInterval: (e: number) => void;
  targetConditionOpen: boolean;
  setTargetConditionOpen: (e: boolean) => void;
  circuitInformation: CircuitInformation;
};

export type LogicSwitchProps = {
  logicType: string;
  thresholdValue: number;
  setThresholdValue: (e: number) => void;
  targetCondition: number;
  setTargetCondition: (e: number) => void;
  targetConditionOpen: boolean;
  setTargetConditionOpen: (e: boolean) => void;
  circuitInformation: CircuitInformation;
};

export type ExecutionConstraintsProps = {
  time: {
    startDate: string | undefined;
    endDate: string | undefined;
  };
  setTime: (e: {
    startDate: string | undefined;
    endDate: string | undefined;
  }) => void;
  maxLitActionCompletions: number | undefined;
  setMaxLitActionCompletions: (e: number | undefined) => void;
  conditionMonitorExecutions: number | undefined;
  setConditionMonitorExecutions: (e: number | undefined) => void;
};

export type EndStartProps = {
  time: {
    startDate: string | undefined;
    endDate: string | undefined;
  };
  setTime: (e: {
    startDate: string | undefined;
    endDate: string | undefined;
  }) => void;
};

export type MaxConditionsProps = {
  conditionMonitorExecutions: number | undefined;
  setConditionMonitorExecutions: (e: number | undefined) => void;
};

export type MaxExecutionProps = {
  maxLitActionCompletions: number | undefined;
  setMaxLitActionCompletions: (e: number | undefined) => void;
};

export type LitActionProps = {
  dispatch: Dispatch<AnyAction>;
  litActionCode: string;
};

export type IPFSProps = {
  ipfsHash: string;
  dispatch: Dispatch<AnyAction>;
  litActionCode: string;
  handleInstantiateCircuit: () => Promise<void>;
  ipfsLoading: boolean;
  circuitInformation: CircuitInformation;
  handleSaveToIPFSDB: () => Promise<void>;
  dbLoading: boolean;
  dbAdded: boolean;
};

export type HashIPFSProps = {
  handleInstantiateCircuit: () => Promise<void>;
  ipfsLoading: boolean;
  circuitInformation: CircuitInformation;
  dispatch: Dispatch<AnyAction>;
};

export type ResultIPFSProps = {
  ipfsLoading: boolean;
  ipfsHash: string;
  handleSaveToIPFSDB: () => Promise<void>;
  dbLoading: boolean;
  dbAdded: boolean;
};

export type MintGrantBurnProps = {
  handleMintGrantBurnPKP: () => Promise<void>;
  pkpLoading: boolean;
  signedPKPTx: {
    tokenId: string;
    publicKey: string;
    address: string;
  };
};

export type MintPKPProps = {
  handleMintGrantBurnPKP: () => Promise<void>;
  pkpLoading: boolean;
};

export type PKPResultProps = {
  signedPKPTx: {
    tokenId: string;
    publicKey: string;
    address: string;
  };
};

export type CircuitInputProps = {
  ipfsHash: string;
  signedPKPTx: {
    tokenId: string;
    publicKey: string;
    address: string;
  };
};
export type CircuitStartProps = {
  handleRunCircuit: () => Promise<void>;
  circuitRunning: boolean;
  circuitRunLoading: boolean;
};

export type ViewInAccountProps = {
  circuitRunning: boolean;
  handleClearCircuit: () => void;
};

export type RunCircuitProps = {
  handleRunCircuit: () => Promise<void>;
  circuitRunning: boolean;
  handleClearCircuit: () => void;
  circuitRunLoading: boolean;
  ipfsHash: string;
  signedPKPTx: {
    tokenId: string;
    publicKey: string;
    address: string;
  };
};

export type FetchActionProps = {
  dropDownsOpenAction: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
    signType: boolean[];
    valueType: boolean[];
  };
  setDropDownsOpenAction: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
    signType: boolean[];
    valueType: boolean[];
  }) => void;
  newFetchActionInformation: FetchAction | undefined;
  dispatch: Dispatch<AnyAction>;
  signConditions: {
    type: string;
    operator: string;
    value: boolean | number | string;
    valueType: boolean | number | string;
  }[];
  setSignConditions: (
    e: {
      type: string;
      operator: string;
      value: boolean | number | string;
      valueType: boolean | number | string;
    }[]
  ) => void;
};

export type ActionSwitchProps = {
  actionType: string;
  actionInputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  actionOutputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  setActionInputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  setActionOutputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  dropDownsOpenAction: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
    signType: boolean[];
    valueType: boolean[];
  };
  setDropDownsOpenAction: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
    signType: boolean[];
    valueType: boolean[];
  }) => void;
  functionArgs: string[];
  setFunctionArgs: (e: string[]) => void;
  newContractActionInformation: ContractAction | undefined;
  newFetchActionInformation: FetchAction | undefined;
  dispatch: Dispatch<AnyAction>;
  payable: boolean;
  setPayable: (e: boolean) => void;
  stateMutability: string;
  setStateMutability: (e: string) => void;
  signConditions: {
    type: string;
    operator: string;
    value: boolean | number | string;
    valueType: boolean | number | string;
  }[];
  setSignConditions: (
    e: {
      type: string;
      operator: string;
      value: boolean | number | string;
      valueType: boolean | number | string;
    }[]
  ) => void;
};

export type ContractActionProps = {
  actionInputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  actionOutputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  setActionInputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  setActionOutputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  dropDownsOpenAction: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
    signType: boolean[];
    valueType: boolean[];
  };
  setDropDownsOpenAction: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
    signType: boolean[];
    valueType: boolean[];
  }) => void;
  functionArgs: string[];
  setFunctionArgs: (e: string[]) => void;
  newContractActionInformation: ContractAction | undefined;
  dispatch: Dispatch<AnyAction>;
  payable: boolean;
  setPayable: (e: boolean) => void;
  stateMutability: string;
  setStateMutability: (e: string) => void;
};

export type AllActionsProps = {
  circuitInformation: CircuitInformation;
  dispatch: Dispatch<AnyAction>;
  setActionType: (e: string) => void;
  setEditingStateAction: (e: boolean) => void;
};

export type MoreActionButtonProps = {
  handleAddActionAndReset: () => void;
  handleUpdateAction: () => void;
  editingStateAction: boolean;
};

export type SetActionsProps = {
  handleAddActionAndReset: () => void;
  handleUpdateAction: () => void;
  signConditions: {
    type: string;
    operator: string;
    value: boolean | number | string;
    valueType: boolean | number | string;
  }[];
  setSignConditions: (
    e: {
      type: string;
      operator: string;
      value: boolean | number | string;
      valueType: boolean | number | string;
    }[]
  ) => void;
  editingStateAction: boolean;
  actionInputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  actionOutputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  setActionInputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  setActionOutputs: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  dropDownsOpenAction: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
    signType: boolean[];
    valueType: boolean[];
  };
  setDropDownsOpenAction: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
    signType: boolean[];
    valueType: boolean[];
  }) => void;
  functionArgs: string[];
  setFunctionArgs: (e: string[]) => void;
  newContractActionInformation: ContractAction | undefined;
  newFetchActionInformation: FetchAction | undefined;
  dispatch: Dispatch<AnyAction>;
  payable: boolean;
  setPayable: (e: boolean) => void;
  stateMutability: string;
  setStateMutability: (e: string) => void;
  actionType: string;
  circuitInformation: CircuitInformation;
  setActionType: (e: string) => void;
  setEditingStateAction: (e: boolean) => void;
};

export type ActionTypeProps = {
  setActionType: (e: string) => void;
  actionType: string;
  editingStateAction: boolean;
};

export type StepsProps = {
  stepCount: number;
  circuitFlowIndex: number;
  dispatch: Dispatch<AnyAction>;
  currentFlowIndex: any;
};

export type FinalConditionProps = {
  conditionInformation: Condition | undefined;
  conditionType: string;
  editingState: boolean;
  conditionFlowIndex: {
    index: number;
    webhookCount: number;
    contractCount: number;
  };
  handleUpdateCondition: () => void;
  handleAddConditionAndReset: () => void;
  dispatch: Dispatch<AnyAction>;
  apiPassword?: boolean;
  setApiPassword?: (e: boolean) => void;
};

export type AbiProps = {
  inputs: {
    indexed: boolean;
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
};

export type DropDownProps = {
  setDropDownOpenIndex: (type: string) => void;
  setDropDownOpen: () => void;
  inputChosen: string;
  dropDownOpen: boolean;
  title: string;
};
