import mongoose from "mongoose";

export const connect=async()=>{
    
const MONGO_URL="mongodb+srv://nasvank7:NJT9fewxMC4VCQF1@socialmedia.mqmrbda.mongodb.net/socialmedia?retryWrites=true&w=majority"
    try {
        await mongoose.connect(MONGO_URL)
        console.log('connected to mongodb');
        
    } catch (error) {
        throw new Error ("connection failed")
        
    }
}

export default connect