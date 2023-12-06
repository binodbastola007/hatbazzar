'use client';
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   userDetails:{},
   isLoggedIn:false,
   token:''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginDetails:(state,actions) =>{
       state.userDetails = actions.payload;
    },
    setToken:(state,actions) =>{
      state.token = actions.payload;
      state.isLoggedIn = true;
    },
    handleLogout:(state)=>{
      state.token = '';
      state.isLoggedIn = false;
    }
  }
});

export const { setLoginDetails,handleLogout,setToken} = userSlice.actions;
export default userSlice.reducer;
