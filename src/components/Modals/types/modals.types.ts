import { CircuitInformation } from "@/components/CircuitFlow/types/circuitflow.types";
import {
  ContractCondition,
  WebhookCondition,
} from "@/components/CircuitFlow/types/litlistener.types";
import { AnyAction, Dispatch } from "redux";

export type GeneralProps = {
  message: string;
  dispatch: Dispatch<AnyAction>;
  image: string;
};

export type PreviewConditionProps = {
  message: string;
  dispatch: Dispatch<AnyAction>;
  circuitInformation: CircuitInformation;
  newWebhookConditionInformation: WebhookCondition | undefined;
  newContractConditionInformation: ContractCondition | undefined;
};

export type PurchaseFulfillmentProps = {
  dispatch: Dispatch<AnyAction>;
};