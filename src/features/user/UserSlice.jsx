import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserById } from "./UserApi";

const initialState = {
  userInfo:null,
  status:'idle'
};

export const getUserByIdAsync=createAsyncThunk('user/getUserByIdAsync',async(id)=>{
  const userData=await getUserById(id)
  return userData
})


export const userSlice = createSlice({
  name: "userSlice",
  initialState:initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(getUserByIdAsync.pending,(state)=>{
        state.status='loading'
      })
      .addCase(getUserByIdAsync.fulfilled,(state,action)=>{
        state.userInfo=action.payload
        state.status='idle'
      })
      .addCase(getUserByIdAsync.rejected,(state)=>{
        state.status='error'
      })
  }
});


export const selectUserInfo=(state)=>state.userSlice.userInfo

// export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer
