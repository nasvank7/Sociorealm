import { configureStore } from "@reduxjs/toolkit";
// import  from '../slices/authSlice'
// import authSlice from "../slices/authSlice";
import userReducer from '../slices/authSlice'



export const store=configureStore({
    reducer:{
        user:userReducer
        
        
    }
})

// export default store;