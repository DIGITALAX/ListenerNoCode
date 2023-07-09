import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import walletConnectedReducer from "./reducers/walletConnectedSlice";
import circuitFlowReducer from "./reducers/circuitFlowSlice";
import circuitInformationReducer from "./reducers/circuitInformationSlice";
import modalOpenReducer from "./reducers/modalOpenSlice";

const reducer = combineReducers({
  walletConnectedReducer,
  circuitFlowReducer,
  circuitInformationReducer,
  modalOpenReducer,
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
