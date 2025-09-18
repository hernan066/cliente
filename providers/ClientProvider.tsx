"use client";
import { Provider } from "react-redux";
import store, { persistor } from "../store"; // Adjust import path
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode } from "react";

const ClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </div>
  );
};

export default ClientProvider;
