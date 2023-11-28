'use client';
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  allData:[],
  category:[],
  categoryArr:[],
  search:''
};

const navSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setAllData: (state, actions) => {
     state.allData = actions.payload;
    },
    setCategory: (state, actions) => {
     state.category = actions.payload;
    },
    setCategoryArr: (state, actions) => {
     state.categoryArr = actions.payload;
    },
    setSearch: (state, actions) => {
     state.search = actions.payload;
    },
  
  }
});

export const { setAllData, setCategory, setCategoryArr, setSearch} = navSlice.actions;
export default navSlice.reducer;
