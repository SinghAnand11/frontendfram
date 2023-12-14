import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../features/user/UserSlice'
import authSlice from '../features/auth/AuthSlice'
import productSlice from '../features/product/ProductSlice'
import CartSlice from "../features/cart/CartSlice";



export const store = configureStore({
  reducer: {
    authSlice,
    userSlice,
    productSlice,
    CartSlice
  },
});
