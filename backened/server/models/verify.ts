import { Schema, model } from "mongoose";

const verifySchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export const Verify = model("verify", verifySchema);
