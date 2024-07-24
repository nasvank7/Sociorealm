import { Request, Response } from "express";
import { Posts } from "../models/post";
import cloudinary from "../config/cloudinary";
import { Comment } from "../models/comment";
import { UserModel } from "../models/users";
import { Report } from "../models/reports";
import Notification from "../models/notification";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const postController = {
  createPost: async (req: Request, res: Response) => {
    try {
 
      const { userId } = req.body
    
      const { description, image } = req.body;


      let cloudImageUrls = [];
      const images = req.files as Express.Multer.File[];
      if (images && images.length > 0) {
        for (const image of images) {
          const result = await cloudinary.uploader.upload(image.path);
          cloudImageUrls.push(result.secure_url);
        }
      }

      const post = await Posts.create({
        userId,
        description,
        image: cloudImageUrls,
      });

      res.status(200).json({
        success: true,
        message: "Post created Successfully",
        data: post,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  },
  getPOst: async (req: Request, res: Response) => {
    try {
  
      const post = await Posts.find().populate('userId')

      res.status(200).json({
        success: true,
        message: "all post are here",
        data: post,
      });
    } catch (error) { }
  }, DeletePOst: async (req: Request, res: Response) => {
    try {
      const { postId } = req.params
    
      await Posts.findByIdAndRemove(postId)
      res.status(200).json({ msg: "successfully deleted" })

    } catch (error) {
      console.log(error);

    }

  },
  LikePost: async (req: Request, res: Response) => {
    try {
      const { postId, userId, value } = req.body;
     

      if (value) {
        await Posts.updateOne({ _id: postId }, { $addToSet: { likes: userId } });
      } else {
        await Posts.updateOne({ _id: postId }, { $pull: { likes: userId } });
      }

      const post = await Posts.findById(postId);
    
      if (userId !== post.userId.toString()) {
        const newNotification = new Notification({
          userId: post.userId,
          type: "like",
          postId: postId,
          senderId: userId,
        });

        await newNotification.save();
      }

      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  CommentPost: async (req: Request, res: Response) => {
    try {
      const { userId, postId, value } = req.body;
      const newComment = new Comment({ userId: userId, postId: postId, comment: value, date: new Date() }).save()
      const post = await Posts.findById(postId)
      if (userId !== post.userId) {
        const newNotifiaction = new Notification({
          userId: post.userId,
          type: "comment",
          postId: postId,
          senderId: userId
        })
       
        await newNotifiaction.save()

      }
      res.status(200).json({ comment: newComment })
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }


  },
  getComment: async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      const comments = await Comment.find({ postId: id }).populate('userId')
      res.status(200).json({ comments })
    } catch (error) {

    }
  },
  SavePost: async (req: Request, res: Response) => {
    const { userId, postId, value } = req.body;

    // Validate and convert IDs to ObjectId
    if (!ObjectId.isValid(userId?._id) || !ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid userId or postId format" });
    }

    const userObjectId = new ObjectId(userId?._id);
    const postObjectId = new ObjectId(postId);

    try {
      if (value) {
       
        await Posts.updateOne({ _id: postObjectId }, { $addToSet: { saved: userObjectId } });
      } else {
      
        await Posts.updateOne({ _id: postObjectId }, { $pull: { saved: userObjectId } });
      }

      res.status(200).json({});
    } catch (error) {
      console.error("Error in SavePost function:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  SavedPost: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params as { userId: string };
      const savePost = await Posts.find({ saved: userId })
      res.status(200).json({
        success: true,
        message: "all post are here",
        data: savePost,
      });

    } catch (error) {
      res.status(500).send({ message: "Internal server error" })
    }
  },
  getsinglePOst: async (req: Request, res: Response) => {
    const { id } = req.params
    const singlePost = await Posts.findById(id).populate('userId')
    res.status(200).json({
      data: singlePost
    })
  },
  FriendPost: async (req: Request, res: Response) => {
    const { username } = req.params
    const user = await UserModel.findOne({ username })
    const friendPost = await Posts.find({ userId: user._id })
    res.status(200).json({
      data: friendPost
    })


  },
  Report: async (req: Request, res: Response) => {
    try {
      const { reporterId, postId, reason } = req.body
      const newReport = await new Report({
        reporterId,
        postId,
        reason
      }).save()
      res.status(200).json({
        success: true, msg: "reported successfully"
      })
    } catch (error) {
      console.log(error);

    }
  },
  getNotification: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const notification = await Notification.find({ userId: id }).populate({ path: 'senderId', select: 'image username', }).populate({ path: 'postId', select: 'image description', })

      res.status(200).json({ notification })
    } catch (error) {

    }
  },
  ClearAllNotification: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await Notification.deleteMany({ userId: id })
      res.status(200).json({ msg: "CLeared successfully" })
    } catch (error) {

    }
  }
};

export default postController;
