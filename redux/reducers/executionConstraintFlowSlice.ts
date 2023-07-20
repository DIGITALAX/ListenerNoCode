import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExecutionConstraintFlowState {
  value: {
    index: number;
    executionCount: number;
  };
}

const initialExecutionConstraintFlowState: ExecutionConstraintFlowState = {
  value: {
    index: 0,
    executionCount: 4,
  },
};

export const executionConstraintFlowSlice = createSlice({
  name: "executionConstraintFlow",
  initialState: initialExecutionConstraintFlowState,
  reducers: {
    setExecutionConstraintFlow: (
      state: ExecutionConstraintFlowState,
      action: PayloadAction<{
        index: number;
        executionCount: number;
      }>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setExecutionConstraintFlow } =
  executionConstraintFlowSlice.actions;

export default executionConstraintFlowSlice.reducer;
