import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConditionFlowState {
  value: {
    index: number;
    webhookCount: number;
    contractCount: number;
  };
}

const initialConditionFlowState: ConditionFlowState = {
  value: {
    index: 0,
    webhookCount: 7,
    contractCount: 7,
  },
};

export const conditionFlowSlice = createSlice({
  name: "conditionFlow",
  initialState: initialConditionFlowState,
  reducers: {
    setConditionFlow: (
      state: ConditionFlowState,
      action: PayloadAction<{
        index: number;
        webhookCount: number;
        contractCount: number;
      }>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setConditionFlow } = conditionFlowSlice.actions;

export default conditionFlowSlice.reducer;
