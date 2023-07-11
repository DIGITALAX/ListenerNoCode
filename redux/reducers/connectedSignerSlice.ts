import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ethers from "ethers";

export interface ConnectedSignerState {
  value: ethers.providers.JsonRpcSigner | undefined;
}

const initialConnectedSignerState: ConnectedSignerState = {
  value: undefined,
};

export const connectedSignerSlice = createSlice({
  name: "connectedSigner",
  initialState: initialConnectedSignerState,
  reducers: {
    setConnectedSigner: (
      state: ConnectedSignerState,
      action: PayloadAction<ethers.providers.JsonRpcSigner | undefined>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setConnectedSigner } = connectedSignerSlice.actions;

export default connectedSignerSlice.reducer;
