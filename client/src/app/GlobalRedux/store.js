"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import cartSlice from "./Features/cart.slice";
import navSlice from "./Features/navbar.slice";
import userSlice from "./Features/user.slice";
import logger from "redux-logger";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  cart: cartSlice,
  navbar: navSlice,
  user: userSlice
  //add all your reducers here
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:[logger]

 });

 export const persistor = persistStore(store);