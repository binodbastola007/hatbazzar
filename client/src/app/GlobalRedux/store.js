"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import cartSlice from "./Features/cart.slice";
import navSlice from "./Features/navbar.slice";
import userSlice from "./Features/user.slice";
import logger from "redux-logger";

const rootReducer = combineReducers({
  cart: cartSlice,
  navbar: navSlice,
  user: userSlice
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,
  middleware:[logger]

 });