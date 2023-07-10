import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IpfsHashState {
  value: string;
}

const initialIpfsHashState: IpfsHashState = {
  value: "",
};

export const ipfsHashSlice = createSlice({
  name: "ipfsHash",
  initialState: initialIpfsHashState,
  reducers: {
    setIpfsHash: (
      state: IpfsHashState,
      action: PayloadAction<string>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setIpfsHash } = ipfsHashSlice.actions;

export default ipfsHashSlice.reducer;
