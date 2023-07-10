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
  circuitFlowIndex: number;
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
  handleHashToIPFS: () => Promise<void>;
  litActionCode: string;
  ipfsLoading: boolean;
  ipfsHash: string;
  time: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  setTime: (e: {
    startDate: Date | undefined;
    endDate: Date | undefined;
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
  matchFunctionsWebhook: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  };
  setMatchFunctionsWebhook: (e: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  }) => void;
  setLogicType: (e: string) => void;
  logicType: string;
  thresholdValue: number;
  setThresholdValue: (e: number) => void;
  targetCondition: number;
  setTargetCondition: (e: number) => void;
  interval: number;
  setInterval: (e: number) => void;
};

export type SetConditionsProps = {
  dispatch: Dispatch<AnyAction>;
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
  matchFunctionsWebhook: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  };
  setMatchFunctionsWebhook: (e: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  }) => void;
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
  dispatch: Dispatch<AnyAction>;
  conditionType: string;
  newWebhookConditionInformation: WebhookCondition | undefined;
  newContractConditionInformation: ContractCondition | undefined;
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
  matchFunctionsWebhook: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  };
  setMatchFunctionsWebhook: (e: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  }) => void;
};

export type NextButtonProps = {
  circuitFlowIndex: number;
  dispatch: Dispatch<AnyAction>;
  text: string;
  circuitInformation: CircuitInformation;
  handleSetConditionalLogic: () => boolean;
  handleAddExecutionConstraints: () => void;
  ipfsHash: string;
};

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
};

export type InputProps = {
  text: string;
};

export type ConditionTypeProps = {
  conditionType: string;
  setConditionType: (e: string) => void;
  editingState: boolean;
};

export type ContractConditionProps = {
  newContractConditionInformation: ContractCondition | undefined;
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
  dispatch: Dispatch<AnyAction>;
};

export type WebhookConditionProps = {
  newWebhookConditionInformation: WebhookCondition | undefined;
  matchFunctionsWebhook: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  };
  setMatchFunctionsWebhook: (e: {
    onMatched: () => Promise<void>;
    onUnMatched: () => Promise<void>;
    onError: () => void;
  }) => void;
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
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  setTime: (e: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => void;
  maxLitActionCompletions: number | undefined;
  setMaxLitActionCompletions: (e: number | undefined) => void;
  conditionMonitorExecutions: number | undefined;
  setConditionMonitorExecutions: (e: number | undefined) => void;
};

export type EndStartProps = {
  time: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  setTime: (e: {
    startDate: Date | undefined;
    endDate: Date | undefined;
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
  handleHashToIPFS: () => Promise<void>;
  ipfsLoading: boolean;
};

export type HashIPFSProps = {
  handleHashToIPFS: () => Promise<void>;
  ipfsLoading: boolean;
};

export type ResultIPFSProps = {
  ipfsLoading: boolean;
  ipfsHash: string;
};

export type MintGrantBurnProps = {
  handleMintGrantBurnPKP: () => Promise<void>;
  pkpLoading: boolean;
  circuitInformation: CircuitInformation;
};

export type MintPKPProps = {
  handleMintGrantBurnPKP: () => Promise<void>;
  pkpLoading: boolean;
};

export type PKPResultProps = {
  circuitInformation: CircuitInformation;
};

export type CircuitInputProps = {
  circuitInformation: CircuitInformation;
  ipfsHash: string;
};
export type CircuitStartProps = {
  handleRunCircuit: () => Promise<void>;
  circuitRunning: boolean;
};

export type ViewInAccountProps = {
  circuitRunning: boolean;
};

export type RunCircuitProps = {
  handleRunCircuit: () => Promise<void>;
  circuitRunning: boolean;
  circuitInformation: CircuitInformation;
  ipfsHash: string;
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
