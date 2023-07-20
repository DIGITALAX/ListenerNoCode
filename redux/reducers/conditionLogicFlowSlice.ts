import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConditionLogicFlowState {
  value: {
    index: number;
    everyCount: number;
    thresholdCount: number;
    targetCount: number;
  };
}

const initialConditionLogicFlowState: ConditionLogicFlowState = {
  value: {
    index: 0,
    everyCount: 2,
    thresholdCount: 3,
    targetCount: 3,
  },
};

export const conditionLogicFlowSlice = createSlice({
  name: "conditionLogicFlow",
  initialState: initialConditionLogicFlowState,
  reducers: {
    setConditionLogicFlow: (
      state: ConditionLogicFlowState,
      action: PayloadAction<{
        index: number;
        everyCount: number;
        thresholdCount: number;
        targetCount: number;
      }>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setConditionLogicFlow } = conditionLogicFlowSlice.actions;

export default conditionLogicFlowSlice.reducer;
