"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import cartSlice from "./Features/cart.slice";


const rootReducer = combineReducers({
  cart: cartSlice
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,

 });