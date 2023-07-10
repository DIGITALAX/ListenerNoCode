import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LitActionCodeState {
  value: string;
}

const initialLitActionCodeState: LitActionCodeState = {
  value: "",
};

export const litActionCodeSlice = createSlice({
  name: "litActionCode",
  initialState: initialLitActionCodeState,
  reducers: {
    setLitActionCode: (
      state: LitActionCodeState,
      action: PayloadAction<string>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setLitActionCode } = litActionCodeSlice.actions;

export default litActionCodeSlice.reducer;
