import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IpfsFlowState {
  value: {
    index: number;
    ipfsCount: number;
  };
}

const initialIpfsFlowState: IpfsFlowState = {
  value: {
    index: 0,
    ipfsCount: 2,
  },
};

export const ipfsFlowSlice = createSlice({
  name: "ipfsFlow",
  initialState: initialIpfsFlowState,
  reducers: {
    setIpfsFlow: (
      state: IpfsFlowState,
      action: PayloadAction<{
        index: number;
        ipfsCount: number;
      }>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setIpfsFlow } =
  ipfsFlowSlice.actions;

export default ipfsFlowSlice.reducer;
