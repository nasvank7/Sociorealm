import mongoose, { Schema,model } from "mongoose";

const followSchema=new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
        
    },
    follower:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:mongoose.Types.ObjectId,
         ref:"User"        
    }]
})

export const Follow = model("follow", followSchema);
