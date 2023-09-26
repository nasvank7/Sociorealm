import { Request, Response } from "express";
import { Posts } from "../models/post";
import cloudinary from "../config/cloudinary";
import { Comment } from "../models/comment";
import { UserModel } from "../models/users";
import { Report } from "../models/reports";
import Notification from "../models/notification";

const postController = {
  createPost: async (req: Request, res: Response) => {
    try {
      console.log(req.body,"this is req.body");

      const {userId}=req.body
      console.log(userId,"this is the user");
      


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
      console.log(post,"New post of user");
      

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
      console.log("ashdfjvashd");
      
      const post = await Posts.find().populate('userId')

      console.log(post, "All posts arehere");
      res.status(200).json({
        success: true,
        message: "all post are here",
        data: post,
      });
    } catch (error) {}
  },DeletePOst:async(req:Request,res:Response)=>{
    try {
      const {postId}=req.params
      console.log(postId);
      
      await Posts.findByIdAndRemove(postId)
      res.status(200).json({msg:"successfully deleted"})
      
    } catch (error) {
      console.log(error);
      
    }

  },
  LikePost:async(req:Request,res:Response)=>{
    try {
      const{postId,userId,value}=req.body
      console.log(req.body,"this is my req.body");
       
      await Posts.updateOne({_id:postId},{$pull:{likes:userId}},{new:true})
   
      const post=await Posts.findById(postId)
      console.log(post);
       if(userId!==post.userId){
        const newNotifiaction=new Notification({
          userId:post.userId,
          type:"like",
          postId: postId, 
          senderId:userId

        })
        console.log(newNotifiaction,"this is newNotification");
        
        await newNotifiaction.save()

       }
       if(value){
         
         await Posts.updateOne({_id:postId},{$push:{likes:userId}},{new:true})
        }
      
       
       
       res.status(200).json({})
    } catch (error) {
       res.status(500).json({error:"Internal server error"})
    }
  },
  CommentPost:async(req:Request,res:Response)=>{
    try {
      const {userId,postId,value}=req.body;
      const newComment=new Comment({userId:userId,postId:postId,comment:value,date:new Date()}).save()
      const post=await Posts.findById(postId)
      if(userId!==post.userId){
        const newNotifiaction=new Notification({
          userId:post.userId,
          type:"comment",
          postId: postId, 
          senderId:userId
        })
        console.log(newNotifiaction,"this is comment new notification");
        await newNotifiaction.save()
        
      }
       res.status(200).json({comment:newComment})
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
    
    
  },
  getComment:async(req:Request,res:Response)=>{
    try {
      const {id}=req.params as {id:string};
      const comments=await Comment.find({postId:id}).populate('userId')
      res.status(200).json({comments})
    } catch (error) {
      
    }
  },
  SavePost:async(req:Request,res:Response)=>{
    const {userId,postId,value} = req.body
    try {
      await Posts.updateOne({ _id: postId }, { $pull: { saved: userId } });
      if (value) {
        await Posts.updateOne({ _id: postId }, { $push: { saved: userId } });
      }
      res.status(200).json({})
    } catch (error) {
      console.log(error);
    }
  },
  SavedPost:async(req:Request,res:Response)=>{
    try {
      const {userId}=req.params  as {userId:string};
      console.log(userId,"this is userId");
      
      const savePost=await Posts.find({saved:userId})
      console.log(savePost,"these are my saved post");
      res.status(200).json({
        success: true,
        message: "all post are here",
        data: savePost,
      });
      
    } catch (error) {
      res.status(500).send({message:"Internal server error"})
    }
  },
  getsinglePOst:async(req:Request,res:Response)=>{
    const {id}=req.params
    const singlePost=await Posts.findById(id).populate('userId')
    res.status(200).json({
      data:singlePost
    })
  },
  FriendPost:async(req:Request,res:Response)=>{
    const {username}=req.params
    const user=await UserModel.findOne({username})
    console.log(user);
    
    const friendPost=await Posts.find({userId:user._id})
    console.log(friendPost,"friendPost are hereeeee");
    res.status(200).json({
      data:friendPost
    })
    

  },
  Report:async(req:Request,res:Response)=>{
    try {
      const {reporterId,postId,reason}=req.body
      console.log(reporterId,postId,reason);
      
      const newReport=await new Report({
        reporterId,
        postId,
        reason
      }).save()
  res.status(200).json({
    success:true,msg:"reported successfully"
  })
    } catch (error) {
      console.log(error);
      
    }
  },
  getNotification:async(req:Request,res:Response)=>{
    try {
       const {id}=req.params
       console.log(id);
       
       const notification=await Notification.find({userId:id}).populate({path: 'senderId',select: 'image username', }).populate({path: 'postId',select: 'image description', })
       console.log(notification,"thisb is notifictaion");
       res.status(200).json({notification})
    } catch (error) {
      
    }
  },
  ClearAllNotification:async(req:Request,res:Response)=>{
    try {
      const {id}=req.params
      await Notification.deleteMany({userId:id})
      res.status(200).json({msg:"CLeared successfully"})
    } catch (error) {
      
    }
  }
};

export default postController;
