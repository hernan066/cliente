import { createSlice } from "@reduxjs/toolkit";

interface ProductQuickViewState {
  isOpen: boolean;
}

const initialState: ProductQuickViewState = {
  isOpen: false,
};

const productQuickViewSlice = createSlice({
  name: "productQuickView",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = productQuickViewSlice.actions;

export default productQuickViewSlice.reducer;
