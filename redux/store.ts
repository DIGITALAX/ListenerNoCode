import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import walletConnectedReducer from "./reducers/walletConnectedSlice";
import circuitFlowReducer from "./reducers/circuitFlowSlice";
import circuitInformationReducer from "./reducers/circuitInformationSlice";
import modalOpenReducer from "./reducers/modalOpenSlice";
import previewConditionModalReducer from "./reducers/previewConditionModalSlice";
import newContractConditionInformationReducer from "./reducers/newContractConditionInformationSlice";
import newWebhookConditionInformationReducer from "./reducers/newWebhookConditionInformationSlice";

const reducer = combineReducers({
  walletConnectedReducer,
  circuitFlowReducer,
  circuitInformationReducer,
  modalOpenReducer,
  previewConditionModalReducer,
  newContractConditionInformationReducer,
  newWebhookConditionInformationReducer,
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
