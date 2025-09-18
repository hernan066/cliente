import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface ProductQuickViewState {
  isOpen: boolean;
  product: Product | null;
}

const initialState: ProductQuickViewState = {
  isOpen: false,
  product: null,
};

const productQuickViewSlice = createSlice({
  name: "productQuickView",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Product>) => {
      state.isOpen = true;
      state.product = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.product = null;
    },
  },
});

export const { openModal, closeModal } = productQuickViewSlice.actions;

export default productQuickViewSlice.reducer;
