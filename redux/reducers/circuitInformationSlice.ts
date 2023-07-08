import { CircuitInformation } from "@/components/CircuitFlow/types/circuitflow.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CircuitInformationState {
  value: CircuitInformation | undefined;
}

const initialCircuitInformationState: CircuitInformationState = {
  value: undefined,
};

export const circuitInformationSlice = createSlice({
  name: "circuitInformation",
  initialState: initialCircuitInformationState,
  reducers: {
    setCircuitInformation: (
      state: CircuitInformationState,
      action: PayloadAction<CircuitInformation | undefined>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setCircuitInformation } = circuitInformationSlice.actions;

export default circuitInformationSlice.reducer;
