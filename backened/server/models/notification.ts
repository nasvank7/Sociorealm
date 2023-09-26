import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['like', 'comment', 'message','follow'],
      required: true,
    },
    postId: {
      type:Schema.Types.ObjectId,
      ref: 'Posts', 
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    msgCount:{
      type:Number,
      default: 0,
    },
    read: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Notification = model('Notification', notificationSchema);
  
  export default Notification