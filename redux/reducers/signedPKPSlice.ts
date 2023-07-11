import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignedPKPState {
  value: string | undefined;
}

const initialSignedPKPState: SignedPKPState = {
  value: undefined,
};

export const signedPKPSlice = createSlice({
  name: "signedPKP",
  initialState: initialSignedPKPState,
  reducers: {
    setSignedPKP: (
      state: SignedPKPState,
      action: PayloadAction<string | undefined>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setSignedPKP } = signedPKPSlice.actions;

export default signedPKPSlice.reducer;
