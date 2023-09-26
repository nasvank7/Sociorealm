import { Request, Response } from "express";

import { UserModel } from "../models/users";
import { Follow } from "../models/follow";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { Document, Types } from "mongoose";

const followController = {
  Follow: async (req: Request, res: Response) => {
    try {
      console.log("follow");
      
      const { userId, OppoId } = req.body;
      console.log(userId, OppoId, "thse are idsss");

      const currentUser = await UserModel.findById({ _id: OppoId });

      if (!currentUser) {
        return res.status(400).send({ message: "Its not current user" });
      }
      const isFollowing = await Follow.exists({
        userId: userId,
        following: OppoId,
      });

      if (isFollowing) {
        return res.status(200).json({ message: "Already following" });
      }
      await Follow.updateOne(
        { userId: userId },
        { $push: { following: OppoId } },
        { upsert: true }
      );

      await Follow.updateOne(
        { userId: OppoId },
        { $push: { follower: userId } },
        { upsert: true }
      );
      res.status(200).json({ msg: "updated successfully" });
    } catch (error) {}
  },

  Unfollow: async (req: Request, res: Response) => {
    try {
      console.log("unfollow");
      
      const { userId, OppoId } = req.body;
      const currentUser = await UserModel.findById({ _id: OppoId });

      if (!currentUser) {
        return res.status(400).send({ message: "Its not current user" });
      }
      const isFollowing = await Follow.exists({
        userId: userId,
        following: OppoId,
      });

      if (!isFollowing) {
        return res.status(200).json({ message: "not a follower" });
      }

      await Follow.updateOne(
        { userId: userId },
        { $pull: { following: OppoId } }
      );

      await Follow.updateOne(
        { userId: OppoId },
        { $pull: { follower:userId } }
      );

      res.status(200).json({ message: "Successfully unfollowed" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getFollow:async(req:Request,res:Response)=>{
    try {
      const {userId}=req.query;
      const data=await Follow.find({userId:userId})
      console.log(data,"this is data");
      
      res.status(200).json({users:data})
    } catch (error) {
      console.log(error);
      
    }
  },
  GetuserFollow:async(req:Request,res:Response)=>{
    try {
      const {userId}=req.query
      const data=await Follow.find({userId:userId})
      console.log(data,"data is here");
      res.status(200).json({users:data})
      
    } catch (error) {
      console.log(error);
      
    }
  },
  getFollower:async(req:Request,res:Response)=>{
    try {
       const {id}=req.params
       const data=await Follow.find({userId:id}).populate('follower','username image')
       console.log(data,"the followerlist");
       res.status(200).json({data:data})
       
    } catch (error) {
      
    }
  },
  getFollowing:async(req:Request,res:Response)=>{
    try {
      const {id}=req.params
      const data=await Follow.find({userId:id}).populate('following','username image')
      console.log(data,"the followerlist");
      res.status(200).json({data:data})
    } catch (error) {
      
    }
  }
};
export default followController;
