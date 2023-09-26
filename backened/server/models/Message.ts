import mongoose, { Schema,model } from "mongoose";

const MessageSchema=new mongoose.Schema({
      ChatUsers:{
        type:Array,
        require:true
      },
      message:{
        type:String,
        require:true
      },
      Sender:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
      },

},{timestamps:true}
)

export const Message=model('Message',MessageSchema)