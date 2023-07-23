import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CircuitRunningState {
  value: boolean;
}

const initialCircuitRunningState: CircuitRunningState = {
  value: false,
};

export const circuitRunningSlice = createSlice({
  name: "circuitRunning",
  initialState: initialCircuitRunningState,
  reducers: {
    setCircuitRunning: (
      state: CircuitRunningState,
      action: PayloadAction<boolean>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setCircuitRunning } = circuitRunningSlice.actions;

export default circuitRunningSlice.reducer;
