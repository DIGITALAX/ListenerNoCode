import { CircuitInformation } from "@/components/CircuitFlow/types/circuitflow.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CircuitInformationState {
  value: CircuitInformation;
}

const initialCircuitInformationState: CircuitInformationState = {
  value: {
    id: undefined,
    conditions: [],
    conditionalLogic: {
      type: "EVERY",
      interval: 120000,
    },
    actions: [],
    executionConstraints: {},
    IPFSHash: ""
  },
};

export const circuitInformationSlice = createSlice({
  name: "circuitInformation",
  initialState: initialCircuitInformationState,
  reducers: {
    setCircuitInformation: (
      state: CircuitInformationState,
      action: PayloadAction<CircuitInformation>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setCircuitInformation } = circuitInformationSlice.actions;

export default circuitInformationSlice.reducer;
