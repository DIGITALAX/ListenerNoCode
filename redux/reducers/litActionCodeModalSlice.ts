import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LitActionCodeModalState {
  value: boolean;
}

const initialLitActionCodeModalState: LitActionCodeModalState = {
  value: false,
};

export const litActionCodeModalSlice = createSlice({
  name: "litActionCodeModal",
  initialState: initialLitActionCodeModalState,
  reducers: {
    setLitActionCodeModal: (
      state: LitActionCodeModalState,
      action: PayloadAction<boolean>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setLitActionCodeModal } = litActionCodeModalSlice.actions;

export default litActionCodeModalSlice.reducer;
