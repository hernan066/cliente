import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // usa localStorage en web

import productQuickViewReducer from "./slices/productQuickViewSlice";
import cartStoreReducer from "./slices/cartSlice";
import mobileSearchReducer from "./slices/mobileSearchSlice";
import wishlistReducer from "./slices/wishlistSlice"; // corregí el nombre (antes estaba mal escrito "whishList")

import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

// Combina todos los reducers
const rootReducer = combineReducers({
  productQuickView: productQuickViewReducer,
  cart: cartStoreReducer,
  mobileSearch: mobileSearchReducer,
  wishlist: wishlistReducer, // corregido
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["wishlist"], // solo persistimos wishlist
};

// Reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necesario para redux-persist
    }).concat(apiSlice.middleware),
});

// Persistor
export const persistor = persistStore(store);

// Tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
