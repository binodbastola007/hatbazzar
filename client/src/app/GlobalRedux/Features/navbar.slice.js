'use client';
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  allData:[],
  category:'',
  categoryArr:[],
  searchBarClose:true,
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
    setSearchBarClose: (state,actions) =>{
     state.searchBarClose = actions.payload;
    },
    setSearch: (state, actions) => {
     state.search = actions.payload;
    },
  
  }
});

export const { setAllData, setCategory, setSearch, setSearchBarClose} = navSlice.actions;
export default navSlice.reducer;
