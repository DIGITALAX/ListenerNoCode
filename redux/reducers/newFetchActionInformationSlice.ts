import { FetchAction } from "@/components/CircuitFlow/types/litlistener.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NewFetchActionInformationState {
  value: FetchAction | undefined;
}

const initialNewFetchActionInformationState: NewFetchActionInformationState = {
  value: undefined,
};

export const newFetchActionInformationSlice = createSlice({
  name: "newFetchActionInformation",
  initialState: initialNewFetchActionInformationState,
  reducers: {
    setNewFetchActionInformation: (
      state: NewFetchActionInformationState,
      action: PayloadAction<FetchAction | undefined>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setNewFetchActionInformation } =
  newFetchActionInformationSlice.actions;

export default newFetchActionInformationSlice.reducer;
