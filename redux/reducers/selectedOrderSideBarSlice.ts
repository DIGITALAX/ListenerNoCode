import { Order } from "@/components/Account/types/account.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedOrderSideBarState {
  value: Order | undefined;
}

const initialSelectedOrderSideBarState: SelectedOrderSideBarState = {
  value: undefined,
};

export const selectedOrderSideBarSlice = createSlice({
  name: "selectedOrderSideBar",
  initialState: initialSelectedOrderSideBarState,
  reducers: {
    setSelectedOrderSideBar: (
      state: SelectedOrderSideBarState,
      action: PayloadAction<Order>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedOrderSideBar } = selectedOrderSideBarSlice.actions;

export default selectedOrderSideBarSlice.reducer;
