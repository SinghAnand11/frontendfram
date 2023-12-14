import axios from 'axios'

export const axiosi=axios.create({withCredentials:true,baseURL:"http://localhost:8000"})

export const signupUser=async(data)=>{
    try {
        const res=await axiosi.post("/auth/signup",data)
        return res.data
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}
export const loginUser=async(data)=>{
        try {
            const res=await axiosi.post("/auth/login",data)
            return res.data
        } catch (error) {
            console.log(error)
            throw error.response.data
        }

}
export const checkAuth=async()=>{
    try {
        const res=await axiosi.get("/auth/check")
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const logoutUser=async()=>{
    try {
        const res=await axiosi.get('/auth/logout')
        return res.data
    } catch (error) {
        console.log(error)
    }
}