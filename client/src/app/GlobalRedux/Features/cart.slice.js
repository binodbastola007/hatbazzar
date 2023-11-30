'use client';
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  productList : [],
  productCount: 0,
  orderId:''
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    buyNow: (state, actions) => {
     state.productList.push(actions.payload);
     state.productCount += 1;
    },
    addToCart: (state, actions) =>{
      state.productList.push(actions.payload);
      state.productCount += 1;
    },
    updateProductList : (state, actions) =>{
      state.productList = actions.payload;
      state.productCount -= 1;
    },
    updateQuantity : (state, actions)=>{
      state.productList = actions.payload;
    },
    setOrderId : (state, actions)=>{
      state.orderId = actions.payload;
    }
  }
});

export const { buyNow , addToCart , updateProductList , updateQuantity, setOrderId} = CartSlice.actions;
export default CartSlice.reducer;
