const { legacy_createStore } = require("redux");

// Reducer
const cartReducer = (
  state = {
    cart: [
      {
        id: 1,
        qty: 2,
      },
    ],
  },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

// Store
const store = legacy_createStore(cartReducer);
console.log(store.getState());

// Subscribe
store.subscribe(() => {
  console.log("STORE CHANGED", store.getState());
});

// Dispatch
const actionAddToCard1 = {
  type: "ADD_TO_CART",
  payload: {
    id: 2,
    qty: 1,
  },
};
store.dispatch(actionAddToCard1);

const actionAddToCard2 = {
  type: "ADD_TO_CART",
  payload: {
    id: 3,
    qty: 4,
  },
};

store.dispatch(actionAddToCard2);
