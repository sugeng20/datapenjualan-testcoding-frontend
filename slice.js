import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
  },
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: false,
  },
  reducers: {
    login(state, action) {
      state.status = true;
    },
  },
});

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    cart: cartSlice.reducer,
  },
});

console.log("on create store", store.getState());

store.subscribe(() => {
  console.log("STORE CHANGED", store.getState());
});

store.dispatch(cartSlice.actions.addToCart({ id: 1, qty: 2 }));
store.dispatch(cartSlice.actions.addToCart({ id: 2, qty: 3 }));
store.dispatch(cartSlice.actions.login());
