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
  handleSetConditionalLogic: () => boolean;
  handleAddExecutionConstraints: () => void;
  handleClearCircuit: () => void;
  overviewOpen: boolean;
  setOverviewOpen: (e: boolean) => void;
  largeScreen: boolean;
};

export type CircuitSwitchProps = {
  serverLoaded: boolean;
  apiPasswordAction: boolean;
  switchNeededPKP: boolean;
  setApiPasswordAction: (e: boolean) => void;
  apiPassword: boolean;
  setApiPassword: (e: boolean) => void;
  dbLoading: boolean;
  dbAdded: boolean;
  switchNeeded: boolean;
  handleSaveToIPFSDB: () => Promise<void>;
  handleClearCircuit: () => void;
  circuitRunLoading: boolean;
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
  };
  setDropDownsOpenAction: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
  }) => void;
  dropDownsSignOpen: {
    signType: boolean[];
    valueType: boolean[];
  };
  setDropDownsSignOpen: (e: {
    signType: boolean[];
    valueType: boolean[];
  }) => void;
  functionArgs: string[];
  setFunctionArgs: (e: string[]) => void;
  payable: boolean;
  setPayable: (e: boolean) => void;
  stateMutability: string;
  setStateMutability: (e: string) => void;
  actionType: string;
  setActionType: (e: string) => void;
  setDropDownChainContractAction: (e: boolean) => void;
  dropDownChainContractAction: boolean;
  handleRunCircuit: () => Promise<void>;
  handleMintGrantBurnPKP: () => Promise<void>;
  pkpLoading: boolean;
  handleInstantiateCircuit: () => Promise<void>;
  ipfsLoading: boolean;
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
  conditionType: string;
  setConditionType: (e: string) => void;
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
  handleUpdateCondition: () => void;
  setLogicType: (e: string) => void;
  logicType: string;
  thresholdValue: number;
  setThresholdValue: (e: number) => void;
  targetCondition: number;
  setTargetCondition: (e: number) => void;
  interval: number;
  setInterval: (e: number) => void;
  setDropDownChainContract: (e: boolean) => void;
  dropDownChainContract: boolean;
};

export type SetConditionsProps = {
  apiPassword: boolean;
  setApiPassword: (e: boolean) => void;
  editingState: boolean;
  handleUpdateCondition: () => void;
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
  conditionType: string;
  setConditionType: (e: string) => void;
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
  setConditionType: (e: string) => void;
  setEditingState: (e: boolean) => void;
};

export type ConnectorProps = {
  topOnly?: boolean;
};

export type NextButtonProps = {
  handleClearCircuit: () => void;
  handleAddExecutionConstraints: () => void;
  handleSetConditionalLogic: () => boolean;
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
  border?: boolean;
};

export type ChoiceProps = {
  choiceType: string;
  setChoiceType: (e: string) => void;
  editingState: boolean;
  arrayValues: string[];
  titleValues: string[];
};

export type LogicOptionsProps = {
  setLogicType: (e: string) => void;
  logicType: string;
};

export type InputLogicProps = {
  valueCondition: number;
  setCondition: (e: number) => void;
  placeholderText: string;
  mainText: string;
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
};

export type LogicSwitchProps = {
  logicType: string;
  thresholdValue: number;
  setThresholdValue: (e: number) => void;
  targetCondition: number;
  setTargetCondition: (e: number) => void;
  targetConditionOpen: boolean;
  setTargetConditionOpen: (e: boolean) => void;
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

export type IPFSProps = {
  serverLoaded: boolean;
  switchNeeded: boolean;
  handleInstantiateCircuit: () => Promise<void>;
  ipfsLoading: boolean;
  handleSaveToIPFSDB: () => Promise<void>;
  dbLoading: boolean;
  dbAdded: boolean;
};

export type HashIPFSProps = {
  handleInstantiateCircuit: () => Promise<void>;
  ipfsLoading: boolean;
  serverLoaded: boolean;
};

export type ResultIPFSProps = {
  handleSaveToIPFSDB: () => Promise<void>;
  dbLoading: boolean;
  dbAdded: boolean;
  switchNeeded: boolean;
};

export type MintGrantBurnProps = {
  switchNeededPKP: boolean;
  handleMintGrantBurnPKP: () => Promise<void>;
  pkpLoading: boolean;
};

export type MintPKPProps = {
  switchNeededPKP: boolean;
  handleMintGrantBurnPKP: () => Promise<void>;
  pkpLoading: boolean;
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
  circuitRunLoading: boolean;
};

export type ViewInAccountProps = {
  handleClearCircuit: () => void;
};

export type RunCircuitProps = {
  handleRunCircuit: () => Promise<void>;
  handleClearCircuit: () => void;
  circuitRunLoading: boolean;
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
  };
  setDropDownsOpenAction: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
  }) => void;
  functionArgs: string[];
  setFunctionArgs: (e: string[]) => void;
  newContractActionInformation: ContractAction | undefined;
  newFetchActionInformation: FetchAction | undefined;

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

export type AllActionsProps = {
  setActionType: (e: string) => void;
  setEditingStateAction: (e: boolean) => void;
};

export type MoreActionButtonProps = {
  handleAddActionAndReset: () => void;
  handleUpdateAction: () => void;
  editingStateAction: boolean;
};

export type SetActionsProps = {
  apiPasswordAction: boolean;
  setApiPasswordAction: (e: boolean) => void;
  setDropDownChainContractAction: (e: boolean) => void;
  dropDownChainContractAction: boolean;
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
  };
  setDropDownsOpenAction: (e: {
    internalTypesInput: boolean[];
    typesInput: boolean[];
    internalTypesOutput: boolean[];
    typesOutput: boolean[];
    payable: boolean;
    stateMutability: boolean;
  }) => void;
  functionArgs: string[];
  setFunctionArgs: (e: string[]) => void;
  payable: boolean;
  setPayable: (e: boolean) => void;
  stateMutability: string;
  setStateMutability: (e: string) => void;
  actionType: string;
  setActionType: (e: string) => void;
  dropDownsSignOpen: {
    signType: boolean[];
    valueType: boolean[];
  };
  setDropDownsSignOpen: (e: {
    signType: boolean[];
    valueType: boolean[];
  }) => void;
};

export type ActionTypeProps = {
  setActionType: (e: string) => void;
  actionType: string;
  editingStateAction: boolean;
};

export type StepsProps = {
  stepCount: number;
  currentFlowIndex: any;
  increaseStepFunction: (index: number) => void;
  largeScreen: number;
};

export type FinalActionProps = {
  signConditions?: {
    type: string;
    operator: string;
    value: string | number | boolean;
    valueType: string | number | boolean;
  }[];
  actionType: string;
  editingState: boolean;
  handleUpdateAction: () => void;
  handleAddActionAndReset: () => void;
  apiPassword?: boolean;
  setApiPassword?: (e: boolean) => void;
  inputs?: {
    internalType: string;
    name: string;
    type: string;
  }[];
  outputs?: {
    internalType: string;
    name: string;
    type: string;
  }[];
  functionArgs?: string[];
};

export type FinalConditionProps = {
  conditionType: string;
  editingState: boolean;
  handleUpdateCondition: () => void;
  handleAddConditionAndReset: () => void;
  apiPassword?: boolean;
  setApiPassword?: (e: boolean) => void;
  inputs?: {
    indexed: boolean;
    internalType: string;
    name: string;
    type: string;
  }[];
  expectedValues?: string[];
  eventArgs?: string[];
};

export type AbiProps = {
  indexed?: boolean;
  type: string;
  payable?: boolean;
  setPayable?: (e: boolean) => void;
  stateMutability?: string;
  setStateMutability?: (e: string) => void;
  setOutputs?: (
    e: {
      internalType: string;
      name: string;
      type: string;
    }[]
  ) => void;
  outputs?: {
    internalType: string;
    name: string;
    type: string;
  }[];
  inputs?:
    | {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
      }[]
    | {
        internalType: string;
        name: string;
        type: string;
      }[];
  setInputs?:
    | ((
        e: {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }[]
      ) => void)
    | ((
        e: {
          internalType: string;
          name: string;
          type: string;
        }[]
      ) => void);
  dropDownsOpen:
    | {
        internalTypesInput: boolean[];
        typesInput: boolean[];
        indexed: boolean[];
        internalTypesOutput: boolean[];
        typesOutput: boolean[];
      }
    | {
        internalTypesInput: boolean[];
        typesInput: boolean[];
        internalTypesOutput: boolean[];
        typesOutput: boolean[];
        payable: boolean;
        stateMutability: boolean;
      };
  setDropDownsOpen:
    | ((e: {
        internalTypesInput: boolean[];
        typesInput: boolean[];
        indexed: boolean[];
        internalTypesOutput: boolean[];
        typesOutput: boolean[];
      }) => void)
    | ((e: {
        internalTypesInput: boolean[];
        typesInput: boolean[];
        internalTypesOutput: boolean[];
        typesOutput: boolean[];
        payable: boolean;
        stateMutability: boolean;
      }) => void);
};

export type DropDownProps = {
  setDropDownOpenIndex: (type: string, index?: number) => void;
  setDropDownOpen: () => void;
  inputChosen: string;
  dropDownOpen: boolean;
  title: string;
  inputArray: any[];
  top?: string;
  border?: boolean;
};

export type DropDownLogicProps = {
  setDropDownOpenIndex: (type: number) => void;
  setDropDownOpen: () => void;
  inputChosen: number;
  dropDownOpen: boolean;
  title: string;
};

export type ArgsProps = {
  setAddMoreArgs: () => void;
  args: string[];
  setOnChangeArgs: (e: string, index: number) => void;
  placeholderText: string;
  nameTitle: string;
};

export type SignConditionProps = {
  signConditions: {
    type: string;
    operator: string;
    value: boolean | number | string;
    valueType: boolean | number | string;
  }[];
  setToSign: (value: string) => void;
  toSignValue: string;
  setAddSignConditions: () => void;
  dropDownsOpen: { signType: boolean[]; valueType: boolean[] };
  setSignType: (value: number) => void;
  setSignOperator: (index: number, type: string) => void;
  setSignValue: (index: number, type: string) => void;
  setSignTypeDropDown: (index: number, type: string) => void;
  setSignValueType: (index: number, type: string) => void;
  setSignValueTypeDropDown: (index: number) => void;
};
