import mongoose from "mongoose";
import { NextFunction } from "express";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    image: [
      {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
      },
    ],
    story: [{
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    }],

    jti: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    isBlocked: {
      type: Boolean,
    },
    isFollowing: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", userSchema);
