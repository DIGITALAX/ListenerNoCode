import { CartItem } from "@/components/Shop/types/shop.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemsState {
  value: CartItem[];
}

const initialCartItemsState: CartItemsState = {
  value: [],
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: initialCartItemsState,
  reducers: {
    setCartItems: (
      state: CartItemsState,
      action: PayloadAction<CartItem[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setCartItems } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
