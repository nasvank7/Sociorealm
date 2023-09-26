import { Request, Response } from "express";
import { UserModel } from "../models/users";
import { generateJwt } from "../services/jwt";
import jwt from "jsonwebtoken";
import { hashedPassword } from "../services/hash";
import bcrypt from "bcrypt";
import { Posts } from "../models/post";
import { Report } from "../models/reports";

const adminController = {
  adminLogin: async (req: Request, res: Response) => {
    console.log("yyyyyyyy");

    const admin = {
      email: "admin@gmail.com",
      password: "1234",
    };
    const { email, password } = req.body;
    if (admin.email === email) {
      console.log("///");

      if (admin.password === password) {
        let token;
        token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).send({ success: "Login successfull" });
      }
    }
  },
  getUSer: async (req: Request, res: Response) => {
    try {
      const user = await UserModel.find();
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Failed for finding users" });
    }
  },

  BlockUser: async (req: Request, res: Response) => {
    try {
      console.log(req.body, "/////////");

      const user = await UserModel.findById(req.body._id);
      const isBlocked = user.isBlocked;
      console.log(isBlocked, "is blocked");

      if (isBlocked === false) {
        user.isBlocked = true;
        await user.save();
        res
          .status(200)
          .send({ message: "User unBlocked Successfully", isBlocked: true });
      } else {
        user.isBlocked = false;
        await user.save();
        console.log(user);

        res.status(200).send({ message: "User Blocked Successfully" });
      }
    } catch (error) {
      console.error("Error in toggling user status:", error);
      res.status(500).send({ message: "Error in toggling user status" });
    }
  },
  getPost: async (req: Request, res: Response) => {
    try {
      const posts = await Posts.find().populate("userId").exec()
      console.log(posts, "these are posts");
      res.status(200).json({data:posts}); 
    } catch (error) {
    
      res.status(500).json({ error: "Internal server error" });
    }
  },
  deletePost:async(req:Request,res:Response)=>{
    const {id}=req.params
     await Posts.findByIdAndRemove(id)
     res.status(200).json({
      msg:"removed successfully",
      success:true
    })
  },
  GetReport:async(req:Request,res:Response)=>{
   
    
    const data= await Report.find().populate('reporterId').populate('postId')
    console.log(data,"these are report count");
    res.status(200).json({msg:"reports are here",reports:data})
    
  }
  
};

export default adminController;
