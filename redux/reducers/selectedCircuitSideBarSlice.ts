
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedUserCircuitSideBarState {
  value: string
}

const initialSelectedUserCircuitSideBarState: SelectedUserCircuitSideBarState = {
  value: "",
};

export const selectedUserCircuitSideBarSlice = createSlice({
  name: "selectedUserCircuitSideBar",
  initialState: initialSelectedUserCircuitSideBarState,
  reducers: {
    setSelectedUserCircuitSideBar: (
      state: SelectedUserCircuitSideBarState,
      action: PayloadAction<string>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedUserCircuitSideBar } = selectedUserCircuitSideBarSlice.actions;

export default selectedUserCircuitSideBarSlice.reducer;
