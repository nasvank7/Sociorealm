import { Schema, model } from "mongoose";

const reportSchema = new Schema({
  reporterId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

export const Report = model("report", reportSchema);
