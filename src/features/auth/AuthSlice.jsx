import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, loginUser, logoutUser, signupUser } from "./AuthApi";

const initialState = {
  status:"idle",
  loggedInUser:null,
  error:null,
  isAuthChecked:false,
};

export const loginUserAsync=createAsyncThunk("auth/loginUserAsync",async(data)=>{
  const res=await loginUser(data)
  return res
})
export const signupUserAsync=createAsyncThunk("auth/signupUserAsync",async(data)=>{
  const res=await signupUser(data)
  return res
})
export const checkAuthAsync=createAsyncThunk("auth/checkAuthAsync",async()=>{
  const res=await checkAuth()
  return res
})
export const logoutUserAsync=createAsyncThunk("auth/logoutUserAsyc",async()=>{
  const res=await logoutUser()
  return res
})

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    clearErrors:(state)=>{
      state.error=null
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(loginUserAsync.pending,(state)=>{
        state.status='loading'
      })
      .addCase(loginUserAsync.fulfilled,(state,action)=>{
        state.loggedInUser=action.payload
        state.status='idle'
      })
      .addCase(loginUserAsync.rejected,(state,action)=>{
        state.status='error'
        state.error=action.error
      })

      .addCase(signupUserAsync.pending,(state)=>{
        state.status='loading'
      })
      .addCase(signupUserAsync.fulfilled,(state,action)=>{
        state.loggedInUser=action.payload
        state.status='idle'
      })
      .addCase(signupUserAsync.rejected,(state,action)=>{
        state.status='error'
        state.error=action.error
      })


      .addCase(checkAuthAsync.pending,(state)=>{
        state.status='loading'
      })
      .addCase(checkAuthAsync.fulfilled,(state,action)=>{
        state.loggedInUser=action.payload
        state.status='idle'
        state.isAuthChecked=true
      })
      .addCase(checkAuthAsync.rejected,(state,action)=>{
        state.status='error'
        state.error=action.error
        state.isAuthChecked=true
      })


      .addCase(logoutUserAsync.pending,(state)=>{
        state.status='loading'
      })
      .addCase(logoutUserAsync.fulfilled,(state)=>{
        state.loggedInUser=null
        state.status='idle'
      })
      .addCase(logoutUserAsync.rejected,(state,action)=>{
        state.status='error'
        state.loggedInUser=null
        state.error=action.error
      })
  }
});

export const selectLoggedInUser=(state)=>state.authSlice.loggedInUser
export const selectError=(state)=>state.authSlice.error
export const selectisAuthChecked=(state)=>state.authSlice.isAuthChecked


export const {clearErrors}=authSlice.actions

export default authSlice.reducer;
