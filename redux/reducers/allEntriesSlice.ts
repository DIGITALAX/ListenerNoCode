import { AllEntries } from "@/components/Actions/types/actions.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AllEntriesState {
  value: AllEntries[];
}

const initialAllEntriesState: AllEntriesState = {
  value: [],
};

export const allEntriesSlice = createSlice({
  name: "allEntries",
  initialState: initialAllEntriesState,
  reducers: {
    setAllEntries: (
      state: AllEntriesState,
      action: PayloadAction<AllEntries[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setAllEntries } = allEntriesSlice.actions;

export default allEntriesSlice.reducer;
