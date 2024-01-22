import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderPlace: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { orderPlace } = orderSlice.actions;

export default orderSlice.reducer;
