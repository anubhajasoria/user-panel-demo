import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
  },
});

// Define and export the root state and dispatch types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
