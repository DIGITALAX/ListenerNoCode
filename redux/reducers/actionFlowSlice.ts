import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ActionFlowState {
  value: {
    index: number;
    fetchCount: number;
    contractCount: number;
  };
}

const initialActionFlowState: ActionFlowState = {
  value: {
    index: 0,
    fetchCount: 7,
    contractCount: 8,
  },
};

export const actionFlowSlice = createSlice({
  name: "actionFlow",
  initialState: initialActionFlowState,
  reducers: {
    setActionFlow: (
      state: ActionFlowState,
      action: PayloadAction<{
        index: number;
        fetchCount: number;
        contractCount: number;
      }>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setActionFlow } = actionFlowSlice.actions;

export default actionFlowSlice.reducer;
