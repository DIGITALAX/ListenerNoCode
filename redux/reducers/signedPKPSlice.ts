import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignedPKPState {
  value: {
    tokenId: string;
    publicKey: string;
    address: string;
  };
}

const initialSignedPKPState: SignedPKPState = {
  value: {
    tokenId: "",
    publicKey: "",
    address: "",
  },
};

export const signedPKPSlice = createSlice({
  name: "signedPKP",
  initialState: initialSignedPKPState,
  reducers: {
    setSignedPKP: (
      state: SignedPKPState,
      action: PayloadAction<{
        tokenId: string;
        publicKey: string;
        address: string;
      }>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setSignedPKP } = signedPKPSlice.actions;

export default signedPKPSlice.reducer;
