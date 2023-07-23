import { SelectedCircuit } from "@/components/Account/types/account.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedUserCircuitState {
  value: SelectedCircuit | undefined;
}

const initialSelectedUserCircuitState: SelectedUserCircuitState = {
  value: undefined,
};

export const selectedUserCircuitSlice = createSlice({
  name: "selectedUserCircuit",
  initialState: initialSelectedUserCircuitState,
  reducers: {
    setSelectedUserCircuit: (
      state: SelectedUserCircuitState,
      action: PayloadAction<SelectedCircuit>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedUserCircuit } = selectedUserCircuitSlice.actions;

export default selectedUserCircuitSlice.reducer;
