import axios from "axios"
// import { log } from "console"

export const axiosInstance=axios.create({
    baseURL:"http://localhost:3001/api/users",
    headers:{
        'authorization':`Bearer ${localStorage.getItem('jwtToken')}`

    }
})

export const adminaxiosInstance=axios.create({
    baseURL:"http://localhost:3001/api/admin",
    headers:{
        'authorization':`Bearer ${localStorage.getItem('adminToken')}`
    }
})

axiosInstance.interceptors.response.use(
    (response)=>{
        console.log(response);
        if(response?.data?.message==="jwt expired"){
            localStorage.removeItem('jwtToken')
            window.location.replace('/login')
        }return response

        
    },
    (error)=>{
        if(error?.response?.data?.message==="jwt expired"){
            localStorage.removeItem('jwtToken')
            window.location.replace('/login')
        }
        return Promise.reject(error)
    }
)
adminaxiosInstance.interceptors.response.use(
    (response)=>{
        console.log(response);
        if(response?.data?.message==="jwt expired"){
            localStorage.removeItem("adminToken")
            window.location.replace('/login')
        }
        return response
        
    },
    (error)=>{
        if(error?.response?.data?.message==="jwt expired"){
            localStorage.removeItem('jwtToken')
            window.location.replace('/login')
        }
        return Promise.reject(error)
    }
)