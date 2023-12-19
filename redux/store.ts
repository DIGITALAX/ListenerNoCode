import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import walletConnectedReducer from "./reducers/walletConnectedSlice";
import circuitFlowReducer from "./reducers/circuitFlowSlice";
import circuitInformationReducer from "./reducers/circuitInformationSlice";
import modalOpenReducer from "./reducers/modalOpenSlice";
import previewConditionModalReducer from "./reducers/previewConditionModalSlice";
import currentIndexItemReducer from "./reducers/currentIndexItemSlice";
import newContractConditionInformationReducer from "./reducers/newContractConditionInformationSlice";
import newWebhookConditionInformationReducer from "./reducers/newWebhookConditionInformationSlice";
import ipfsHashReducer from "./reducers/ipfsHashSlice";
import newContractActionInformationReducer from "./reducers/newContractActionInformationSlice";
import newFetchActionInformationReducer from "./reducers/newFetchActionInformationSlice";
import signedPKPReducer from "./reducers/signedPKPSlice";
import conditionFlowReducer from "./reducers/conditionFlowSlice";
import conditionLogicFlowReducer from "./reducers/conditionLogicFlowSlice";
import actionFlowReducer from "./reducers/actionFlowSlice";
import executionConstraintFlowReducer from "./reducers/executionConstraintFlowSlice";
import ipfsFlowReducer from "./reducers/ipfsFlowSlice";
import mintPKPFlowReducer from "./reducers/mintPKPFlowSlice";
import runCircuitFlowReducer from "./reducers/runCircuitFlowSlice";
import allUserCircuitsReducer from "./reducers/allUserCircuits";
import circuitRunningReducer from "./reducers/circuitRunningSlice";
import selectedCircuitReducer from "./reducers/selectedCircuitSlice";
import selectedCircuitSideBarReudcer from "./reducers/selectedCircuitSideBarSlice";
import allEntriesReducer from "./reducers/allEntriesSlice";
import allShopReducer from "./reducers/allShopSlice";
import purchaseModalReducer from "./reducers/purchaseModalSlice";
import allOrdersReducer from "./reducers/allOrdersSlice";
import switchAccountReducer from "./reducers/switchAccountSlice";
import selectedOrderSideBarReducer from "./reducers/selectedOrderSideBarSlice";
import oracleDataReducer from "./reducers/oracleDataSlice";
import lensConnectedReducer from "./reducers/lensConnectedSlice";

const reducer = combineReducers({
  walletConnectedReducer,
  circuitFlowReducer,
  circuitInformationReducer,
  modalOpenReducer,
  previewConditionModalReducer,
  newContractConditionInformationReducer,
  newWebhookConditionInformationReducer,
  ipfsHashReducer,
  newContractActionInformationReducer,
  newFetchActionInformationReducer,
  signedPKPReducer,
  conditionFlowReducer,
  conditionLogicFlowReducer,
  actionFlowReducer,
  executionConstraintFlowReducer,
  ipfsFlowReducer,
  mintPKPFlowReducer,
  runCircuitFlowReducer,
  allUserCircuitsReducer,
  circuitRunningReducer,
  selectedCircuitReducer,
  selectedCircuitSideBarReudcer,
  allEntriesReducer,
  allShopReducer,
  currentIndexItemReducer,
  purchaseModalReducer,
  allOrdersReducer,
  switchAccountReducer,
  selectedOrderSideBarReducer,
  oracleDataReducer,
  lensConnectedReducer,
});

export const store = configureStore({
  reducer: {
    app: reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
