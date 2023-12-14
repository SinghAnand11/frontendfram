import { axiosi } from "../auth/AuthApi"

export const getProuducts=async(role)=>{
try {

    if(role==='user'){
        const res=await axiosi.get('/products?admin=true')
        return res.data
    }
    else{
        const res=await axiosi.get('/products')
        return res.data
    }
} catch (error) {
    console.log(error)
}
}


export const createProduct=async(data)=>{
    try {
        const res=await axiosi.post("/products",data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const updateProductById=async(update)=>{
    try {
        const res=await axiosi.patch(`/products/${update._id}`,update)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getProductById=async(id)=>{
    try {
        const res=await axiosi.get(`/products/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}