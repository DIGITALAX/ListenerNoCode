import { CircuitInformation } from "@/components/CircuitFlow/types/circuitflow.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CircuitInformationState {
  value: CircuitInformation;
}

const initialCircuitInformationState: CircuitInformationState = {
  value: {
    conditions: [],
    conditionalLogic: {
      type: "EVERY",
      interval: 1000,
    },
    actions: [],
    executionConstraints: {

    },
    IPFSHash: "",
    PKP: {
      address: `0x`,
      publicKey: `0x04` 
    }
  }
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