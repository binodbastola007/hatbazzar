'use client';
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  productList : []
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeProductList: (state, actions) => {
     state.productList.push(actions.payload);
    }
  }
});

export const { changeProductList} = CartSlice.actions;
export default CartSlice.reducer;
