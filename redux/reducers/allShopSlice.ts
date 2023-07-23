import { AllShop } from "@/components/Shop/types/shop.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AllShopState {
  value: AllShop[];
}

const initialAllShopState: AllShopState = {
  value: [],
};

export const allShopSlice = createSlice({
  name: "allShop",
  initialState: initialAllShopState,
  reducers: {
    setAllShop: (state: AllShopState, action: PayloadAction<AllShop[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setAllShop } = allShopSlice.actions;

export default allShopSlice.reducer;
