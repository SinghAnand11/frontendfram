import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteCartItemById, getCartItemsByUserId, updateCartItemById } from "./CartApi";


const initialState={
    cartItems:[],
    status:"idle"
}


export const addToCartAsync=createAsyncThunk("cart/addToCartAsync",async(data)=>{
    const res=await addToCart(data)
    return res
})
export const getCartItemsByUserIdAsync=createAsyncThunk("cart/getCartItemsByUserIdAsync",async(id)=>{
    const res=await getCartItemsByUserId(id)
    return res
})
export const deleteCartItemByIdAsync=createAsyncThunk("cart/deleteCartItemByIdAsync",async(id)=>{
    const res=await deleteCartItemById(id)
    return res
})
export const updateCartItemByIdAsync=createAsyncThunk("cart/updateCartItemByIdAsync",async(update)=>{
    const res=await updateCartItemById(update)
    return res
})

const cartSlice=createSlice({
    name:"cartSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(addToCartAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(addToCartAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.cartItems.push(action.payload)
            })
            .addCase(addToCartAsync.rejected,(state)=>{
                state.status='error'
            })

            .addCase(getCartItemsByUserIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getCartItemsByUserIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.cartItems=action.payload
            })
            .addCase(getCartItemsByUserIdAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(deleteCartItemByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(deleteCartItemByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.cartItems=state.cartItems.filter((item)=>item._id!==action.payload._id)
            })
            .addCase(deleteCartItemByIdAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(updateCartItemByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(updateCartItemByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                const index=state.cartItems.findIndex((item)=>item._id===action.payload._id)
                state.cartItems[index]=action.payload
            })
            .addCase(updateCartItemByIdAsync.rejected,(state)=>{
                state.status='error'
            })
    }
})


export const selectCartItems=(state)=>state.CartSlice.cartItems

export default cartSlice.reducer