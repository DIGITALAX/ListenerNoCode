import { AllCircuits } from "@/components/Account/types/account.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AllUserCircuitsState {
  value: AllCircuits[];
}

const initialAllUserCircuitsState: AllUserCircuitsState = {
  value: [],
};

export const allUserCircuitsSlice = createSlice({
  name: "allUserCircuits",
  initialState: initialAllUserCircuitsState,
  reducers: {
    setAllUserCircuits: (
      state: AllUserCircuitsState,
      action: PayloadAction<AllCircuits[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setAllUserCircuits } = allUserCircuitsSlice.actions;

export default allUserCircuitsSlice.reducer;
