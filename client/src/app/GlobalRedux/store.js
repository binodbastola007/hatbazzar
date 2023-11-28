"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import cartSlice from "./Features/cart.slice";
import navSlice from "./Features/navbar.slice";

const rootReducer = combineReducers({
  cart: cartSlice,
  navbar: navSlice
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,

 });