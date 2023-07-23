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
import { NextRouter } from "next/router";

export type OverviewProps = {
  circuitFlowIndex: number;
  dispatch: Dispatch<AnyAction>;
  circuitInformation: CircuitInformation;
  handleSetConditionalLogic: () => boolean;
  handleAddExecutionConstraints: () => void;
  ipfsHash: string;
  handleClearCircuit: () => void;
  circuitRunning: boolean;
};

export type CircuitSwitchProps = {
  address: boolean;
  openConnectModal: (() => void) | undefined;
  apiPasswordAction: boolean;
  litActionCode: string;
  ipfsFlowIndex: {
    index: number;
    ipfsCount: number;
  };
  switchNeededPKP: boolean;
  setApiPasswordAction: (e: boolean) => void;
  executionConstraintFlowIndex: {
    index: number;
    executionCount: number;
  };
  conditionFlowIndex: {
    index: number;
    contractCount: number;
    webhookCount: number;
  };
  actionFlowIndex: {
    index: number;
    contractCount: number;
    fetchCount: number;
  };
  conditionLogicFlowIndex: {
    index: number;
    everyCount: number;
    thresholdCount: number;
    targetCount: number;
  };
  apiPassword: boolean;
  setApiPassword: (e: boolean) => void;
  circuitFlowIndex: number;
  dbLoading: boolean;
  dbAdded: boolean;
  switchNeeded: boolean;
  openChainModal: (() => void) | undefined;
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
  newContractActionInformation: ContractAction | undefined;
  newFetchActionInformation: FetchAction | undefined;
  payable: boolean;
  setPayable: (e: boolean) => void;
  stateMutability: string;
  setStateMutability: (e: string) => void;
  actionType: string;
  setActionType: (e: string) => void;
  setDropDownChainContractAction: (e: boolean) => void;
  dropDownChainContractAction: boolean;
  handleRunCircuit: () => Promise<void>;
  circuitRunning: boolean;
  handleMintGrantBurnPKP: () => Promise<void>;
  pkpLoading: boolean;
  handleInstantiateCircuit: () => Promise<void>;
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
  circuitInformation: CircuitInformation;
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
  conditionFlowIndex: {
    index: number;
    webhookCount: number;
    contractCount: number;
  };
};

export type ConnectorProps = {
  topOnly?: boolean;
};

export type NextButtonProps = {
  mintPKPFlowIndex: {
    index: number;
    mintPKPCount: number;
  };
  handleClearCircuit: () => void;
  circuitRunning: boolean;
  router: NextRouter;
  signedPKPTx: {
    tokenId: string;
    publicKey: string;
    address: string;
  };
  conditionFlowIndex: {
    index: number;
    webhookCount: number;
    contractCount: number;
  };
  ipfsFlowIndex: {
    index: number;
    ipfsCount: number;
  };
  circuitFlowIndex: number;
  dispatch: Dispatch<AnyAction>;
  circuitInformation: CircuitInformation;
  handleAddExecutionConstraints: () => void;
  handleSetConditionalLogic: () => boolean;
  ipfsHash: string | undefined;
  stepCount: number;
  conditionLogicFlowIndex: {
    index: number;
    everyCount: number;
    thresholdCount: number;
    targetCount: number;
  };
  actionFlowIndex: {
    index: number;
    fetchCount: number;
    contractCount: number;
  };
  executionConstraintFlowIndex: {
    index: number;
    executionCount: number;
  };
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
  circuitInformation: CircuitInformation;
  conditionLogicFlowIndex: {
    index: number;
    everyCount: number;
    thresholdCount: number;
    targetCount: number;
  };
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
  executionConstraintFlowIndex: {
    index: number;
    executionCount: number;
  };
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
  ipfsFlowIndex: {
    index: number;
    ipfsCount: number;
  };
  address: boolean;
  openConnectModal: (() => void) | undefined;
  switchNeeded: boolean;
  openChainModal: (() => void) | undefined;
  ipfsHash: string;
  handleInstantiateCircuit: () => Promise<void>;
  ipfsLoading: boolean;
  handleSaveToIPFSDB: () => Promise<void>;
  dbLoading: boolean;
  dbAdded: boolean;
  litActionCode: string;
};

export type HashIPFSProps = {
  handleInstantiateCircuit: () => Promise<void>;
  ipfsLoading: boolean;
  ipfsHash: string;
  litActionCode: string;
  address: boolean;
  openConnectModal: (() => void) | undefined;
};

export type ResultIPFSProps = {
  handleSaveToIPFSDB: () => Promise<void>;
  dbLoading: boolean;
  dbAdded: boolean;
  switchNeeded: boolean;
  openChainModal: (() => void) | undefined;
};

export type MintGrantBurnProps = {
  openChainModal: (() => void) | undefined;
  switchNeededPKP: boolean;
  handleMintGrantBurnPKP: () => Promise<void>;
  pkpLoading: boolean;
  signedPKPTx: {
    tokenId: string;
    publicKey: string;
    address: string;
  };
};

export type MintPKPProps = {
  openChainModal: (() => void) | undefined;
  switchNeededPKP: boolean;
  handleMintGrantBurnPKP: () => Promise<void>;
  pkpLoading: boolean;
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

export type AllActionsProps = {
  circuitInformation: CircuitInformation;
  dispatch: Dispatch<AnyAction>;
  setActionType: (e: string) => void;
  setEditingStateAction: (e: boolean) => void;
  actionFlowIndex: {
    index: number;
    contractCount: number;
    fetchCount: number;
  };
};

export type MoreActionButtonProps = {
  handleAddActionAndReset: () => void;
  handleUpdateAction: () => void;
  editingStateAction: boolean;
};

export type SetActionsProps = {
  apiPasswordAction: boolean;
  setApiPasswordAction: (e: boolean) => void;
  actionFlowIndex: {
    index: number;
    contractCount: number;
    fetchCount: number;
  };
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
};

export type FinalActionProps = {
  actionInformation: Action | undefined;
  signConditions?: {
    type: string;
    operator: string;
    value: string | number | boolean;
    valueType: string | number | boolean;
  }[];
  actionType: string;
  editingState: boolean;
  actionFlowIndex: {
    index: number;
    fetchCount: number;
    contractCount: number;
  };
  circuitInformation: CircuitInformation;
  handleUpdateAction: () => void;
  handleAddActionAndReset: () => void;
  dispatch: Dispatch<AnyAction>;
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
  conditionInformation: Condition | undefined;
  conditionType: string;
  editingState: boolean;
  conditionFlowIndex: {
    index: number;
    webhookCount: number;
    contractCount: number;
  };
  circuitInformation: CircuitInformation;
  handleUpdateCondition: () => void;
  handleAddConditionAndReset: () => void;
  dispatch: Dispatch<AnyAction>;
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
  circuitInformation: CircuitInformation;
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
