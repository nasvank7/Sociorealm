import mongoose from "mongoose";

export const connect=async()=>{
    

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to mongodb');
        
    } catch (error) {
        throw new Error ("connection failed")
        
    }
}

export default connect