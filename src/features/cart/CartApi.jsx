import { axiosi } from "../auth/AuthApi"

export const addToCart=async(data)=>{
    try {
        const res=await axiosi.post('/cart',data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getCartItemsByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/cart/user/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const updateCartItemById=async(update)=>{
    try {
        const res=await axiosi.patch(`/cart/${update._id}`,update)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteCartItemById=async(id)=>{
    try {
        const res=await axiosi.delete(`/cart/${id}`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}