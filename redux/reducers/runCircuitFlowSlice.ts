import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RunCircuitState {
  value: {
    index: number;
    circuitCount: number;
  };
}

const initialRunCircuitState: RunCircuitState = {
  value: {
    index: 0,
    circuitCount: 1,
  },
};

export const runCircuitSlice = createSlice({
  name: "runCircuit",
  initialState: initialRunCircuitState,
  reducers: {
    setRunCircuit: (
      state: RunCircuitState,
      action: PayloadAction<{
        index: number;
        circuitCount: number;
      }>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setRunCircuit } = runCircuitSlice.actions;

export default runCircuitSlice.reducer;
