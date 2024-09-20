import axios from "axios"

export const getAllProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/get-all`)
    return res.data 
}

export const createProduct = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/product/create`, data)
    return res.data 
}