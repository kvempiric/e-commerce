import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../features/CartSlice";
import OrderReducer from "../features/orderSlice";

const store = configureStore({
  reducer: {
    cart: CartReducer,
    order: OrderReducer,
  },
});

export default store;
