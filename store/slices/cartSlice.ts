"use client";
import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { CartItem } from "@/types";

const STORAGE_KEY = "cart-items";

interface CartState {
  cartItems: CartItem[];
  couponCode: string | null;
}

const isLocalStorageAvailable =
  typeof window !== "undefined" && window.localStorage;

const initialState: CartState = {
  cartItems:
    isLocalStorageAvailable && localStorage.getItem(STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
      : [],
  couponCode: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ itemId: number; newQuantity: number }>
    ) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.itemId
      );
      if (item) {
        item.quantity = action.payload.newQuantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.couponCode = null;
    },
    applyCoupon: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload;
    },
    removeCoupon: (state) => {
      state.couponCode = null;
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) =>
  state.cart.cartItems;
export const selectCouponCode = (state: { cart: CartState }) =>
  state.cart.couponCode;

export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);

export const selectTotalPrice = (state: { cart: CartState }) => {
  let totalPrice = state.cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  if (state.cart.couponCode === "YOUR_COUPON_CODE") {
    totalPrice *= 0.9;
  }
  return totalPrice;
};

export const selectTax = (state: { cart: CartState }) =>
  selectTotalPrice(state) * 0.1;

export const selectShippingFee = () => 5;

export const selectTotalAmount = (state: { cart: CartState }) =>
  selectTotalPrice(state) + selectTax(state) + selectShippingFee();

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default cartSlice.reducer;
