import { createSlice } from "@reduxjs/toolkit";

export interface ModalOpenState {
  open: boolean;
  message: string;
  image: string;
}

const initialModalOpenState: ModalOpenState = {
  open: false,
  message: "",
  image: "",
};

export const modalOpenSlice = createSlice({
  name: "modalOpen",
  initialState: initialModalOpenState,
  reducers: {
    setModalOpen: (
      state: ModalOpenState,
      { payload: { actionOpen, actionMessage, actionImage } }
    ) => {
      state.open = actionOpen;
      state.message = actionMessage;
      state.image = actionImage;
    },
  },
});

export const { setModalOpen } = modalOpenSlice.actions;

export default modalOpenSlice.reducer;
