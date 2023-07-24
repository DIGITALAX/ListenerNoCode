import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PurchaseModalState {
  value: boolean;
}

const initialPurchaseModalState: PurchaseModalState = {
  value: false,
};

export const purchaseModalSlice = createSlice({
  name: "purchaseModal",
  initialState: initialPurchaseModalState,
  reducers: {
    setPurchaseModal: (
      state: PurchaseModalState,
      action: PayloadAction<boolean>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setPurchaseModal } = purchaseModalSlice.actions;

export default purchaseModalSlice.reducer;
