// src/store/wishlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface WishlistState {
  wishlistItems: Product[];
}

const initialState: WishlistState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.wishlistItems.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.wishlistItems.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

// Selectores
export const selectWishlist = (state: { wishlist: WishlistState }) =>
  state.wishlist.wishlistItems;

export const isInWishlist =
  (itemId: number) => (state: { wishlist: WishlistState }) =>
    state.wishlist.wishlistItems.some((item) => item.id === itemId);

// Actions
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

// Reducer
export default wishlistSlice.reducer;
