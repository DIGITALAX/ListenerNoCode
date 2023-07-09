import { createSlice } from "@reduxjs/toolkit";

export interface PreviewConditionState {
  open: boolean;
  message: string;
}

const initialPreviewConditionState: PreviewConditionState = {
  open: false,
  message: "",
};

export const previewConditionSlice = createSlice({
  name: "previewCondition",
  initialState: initialPreviewConditionState,
  reducers: {
    setPreviewCondition: (
      state: PreviewConditionState,
      { payload: { actionOpen, actionMessage } }
    ) => {
      state.open = actionOpen;
      state.message = actionMessage;
    },
  },
});

export const { setPreviewCondition } = previewConditionSlice.actions;

export default previewConditionSlice.reducer;
