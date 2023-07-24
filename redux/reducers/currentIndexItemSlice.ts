import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentIndexItemState {
  value: number[];
}

const initialCurrentIndexItemState: CurrentIndexItemState = {
  value: [],
};

export const currentIndexItemSlice = createSlice({
  name: "currentIndexItem",
  initialState: initialCurrentIndexItemState,
  reducers: {
    setCurrentIndexItem: (
      state: CurrentIndexItemState,
      action: PayloadAction<number[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentIndexItem } = currentIndexItemSlice.actions;

export default currentIndexItemSlice.reducer;
