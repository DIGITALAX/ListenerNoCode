import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SwitchAccountState {
  value: boolean;
}

const initialSwitchAccountState: SwitchAccountState = {
  value: false,
};

export const switchAccountSlice = createSlice({
  name: "switchAccount",
  initialState: initialSwitchAccountState,
  reducers: {
    setSwitchAccount: (
      state: SwitchAccountState,
      action: PayloadAction<boolean>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setSwitchAccount } = switchAccountSlice.actions;

export default switchAccountSlice.reducer;
