import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MintPKPFlowState {
  value: {
    index: number;
    mintPKPCount: number;
  };
}

const initialMintPKPFlowState: MintPKPFlowState = {
  value: {
    index: 0,
    mintPKPCount: 1,
  },
};

export const mintPKPFlowSlice = createSlice({
  name: "mintPKPFlow",
  initialState: initialMintPKPFlowState,
  reducers: {
    setMintPKPFlow: (
      state: MintPKPFlowState,
      action: PayloadAction<{
        index: number;
        mintPKPCount: number;
      }>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setMintPKPFlow } = mintPKPFlowSlice.actions;

export default mintPKPFlowSlice.reducer;
