import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, getProductById, getProuducts, updateProductById } from "./ProductApi";

const initialState = {
  productList: [],
  cartItem: [],
  selectedProduct:[],
  status:"idle"
};


export const getProductsAsync=createAsyncThunk('products/getProductsAsync',async(role)=>{
  const data=await getProuducts(role)
  return data
})

export const updateProductByIdAsync=createAsyncThunk("cart/updateProductByIdAsync",async(update)=>{
  const res=await updateProductById(update)
  return res
})
export const getProductByIdAsync=createAsyncThunk("cart/getProductByIdAsync",async(id)=>{
  const res=await getProductById(id)
  return res
})
export const createProductAsync=createAsyncThunk("cart/createProductAsync",async(data)=>{
  const res=await createProduct(data)
  return res
})

export const productSlice = createSlice({
  name: "productSlice",
  initialState:initialState,
  extraReducers:(builder)=>{
    builder
      .addCase(getProductsAsync.pending,(state)=>{
        state.status='loading'
      })
      .addCase(getProductsAsync.fulfilled,(state,action)=>{
        state.status='idle'
        state.productList=action.payload
      })
      .addCase(getProductsAsync.rejected,(state)=>{
        state.status='error'
      })

      .addCase(updateProductByIdAsync.pending,(state)=>{
        state.status='loading'
      })
      .addCase(updateProductByIdAsync.fulfilled,(state,action)=>{
        state.status='idle'
        const index=state.productList.findIndex(item=>item._id===action.payload._id)
        state.selectedProduct=action.payload
        state.productList[index]=action.payload
      })
      .addCase(updateProductByIdAsync.rejected,(state)=>{
        state.status='error'
      })


      .addCase(createProductAsync.pending,(state)=>{
        state.status='loading'
      })
      .addCase(createProductAsync.fulfilled,(state,action)=>{
        state.status='idle'
        state.productList.push(action.payload)
      })
      .addCase(createProductAsync.rejected,(state)=>{
        state.status='error'
      })

      .addCase(getProductByIdAsync.pending,(state)=>{
        state.status='loading'
      })
      .addCase(getProductByIdAsync.fulfilled,(state,action)=>{
        state.status='idle'
        state.selectedProduct=action.payload
      })
      .addCase(getProductByIdAsync.rejected,(state)=>{
        state.status='error'
      })
  }
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;


export const selectProducts=(state)=>state.productSlice.productList
export const selectSelectedProduct=(state)=>state.productSlice.selectedProduct

export default productSlice.reducer;
