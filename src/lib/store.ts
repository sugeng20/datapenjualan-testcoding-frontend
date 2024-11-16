"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/lib/features/counter/counterSlice";
import itemReducer from "@/lib/features/item/itemSlice";
import typeReducer from "@/lib/features/type/typeSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    items: itemReducer,
    types: typeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
