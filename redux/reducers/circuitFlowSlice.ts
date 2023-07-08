import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CircuitFlowState {
  value: number;
}

const initialCircuitFlowState: CircuitFlowState = {
  value: 0,
};

export const circuitFlowSlice = createSlice({
  name: "circuitFlow",
  initialState: initialCircuitFlowState,
  reducers: {
    setCircuitFlow: (
      state: CircuitFlowState,
      action: PayloadAction<number>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setCircuitFlow } = circuitFlowSlice.actions;

export default circuitFlowSlice.reducer;
