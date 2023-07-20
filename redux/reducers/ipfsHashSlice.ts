import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IpfsHashState {
  value: {
    ipfs: string;
    litCode: string;
  };
}

const initialIpfsHashState: IpfsHashState = {
  value: {
    ipfs: "",
    litCode: "",
  },
};

export const ipfsHashSlice = createSlice({
  name: "ipfsHash",
  initialState: initialIpfsHashState,
  reducers: {
    setIpfsHash: (
      state: IpfsHashState,
      action: PayloadAction<{
        ipfs: string;
        litCode: string;
      }>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setIpfsHash } = ipfsHashSlice.actions;

export default ipfsHashSlice.reducer;
