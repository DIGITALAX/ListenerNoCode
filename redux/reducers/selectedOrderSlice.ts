import { Order } from "@/components/Account/types/account.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedOrderCircuitState {
  value: Order | undefined;
}

const initialSelectedOrderCircuitState: SelectedOrderCircuitState = {
  value: undefined,
};

export const selectedOrderCircuitSlice = createSlice({
  name: "selectedOrderCircuit",
  initialState: initialSelectedOrderCircuitState,
  reducers: {
    setSelectedOrderCircuit: (
      state: SelectedOrderCircuitState,
      action: PayloadAction<Order>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedOrderCircuit } = selectedOrderCircuitSlice.actions;

export default selectedOrderCircuitSlice.reducer;
