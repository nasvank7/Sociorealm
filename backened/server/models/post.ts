import mongoose, { Schema, model } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    saved: [
      {
        type: Schema.Types.ObjectId,
        ref:"User"
      },
    ],
  },
  { timestamps: true }
);

export const Posts = mongoose.model("Posts", postSchema);
