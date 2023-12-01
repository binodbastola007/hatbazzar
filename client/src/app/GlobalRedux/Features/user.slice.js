'use client';
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   userDetails:{},
   isLoggedIn:false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginDetails:(state,actions) =>{
       
    },
    handleLogout:(state)=>{

    }
  }
});

export const { setLoginDetails,handleLogout} = userSlice.actions;
export default userSlice.reducer;
