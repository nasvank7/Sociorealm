import { Request, Response } from "express";
import { UserModel } from "../models/users";
import { generateJwt } from "../services/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { hashedPassword } from "../services/hash";
import bcrypt, { genSalt } from "bcrypt";
import { verificationEmail } from "../services/nodemailer";
import { Verify } from "../models/verify";
import { Posts } from "../models/post";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { ObjectId } from "mongoose";
import cloudinary from "../config/cloudinary";

const userController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await UserModel.findById(req.body.userId);

      res.status(200).send({
        success: true,
        message: "user fetched success",
        data: user,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  },

  Register: async (req: Request, res: Response) => {
    const data = await UserModel.find();

    res.status(200).json(data);
  },

  postRegister: async (req: Request, res: Response) => {
    try {
      let {
        username,
        email,
        phone,
        password,
      }: { username: string; email: string; phone: string; password: string } =
        req.body;

      const userExists = await UserModel.findOne({ email });
      if (userExists) {
        res.status(400);
        throw new Error("user already exists");
      }
      password = await hashedPassword(password);
      const user = new UserModel({
        username,
        email,
        phone,
        password,
        isBlocked: true,
      });
      await user.save();

      res.status(200).send({ message: "You have registered successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  postLogin: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const user = await UserModel.findOne({ username });

      if (user) {
        if (!user.isBlocked) {
          res.send({ Blocked: "Account is Blocked" });
          return;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          let token;
          token = generateJwt(user);
          res.status(200).send({ success: true, token: token });
        } else {
          res.status(400).send({ passError: "Invalid Password" });
        }
      } else {
        res.status(400).send({ userNameErr: "Invalid Username" });
      }
    } catch (error) {
      console.log(error);

      res.status(500).send({ err: "internal Server Error" });
    }
  },
  GoogleSignup: async (req: Request, res: Response) => {
    const token = req.body.credential;
    console.log(token);

    const decoded = jwt.decode(token);
    console.log(decoded, "token");
    const { name, email, jti } = decoded as JwtPayload;
    const newUser = new UserModel({
      username: name,
      email,
      jti,
      status: true,
    });
    newUser
      .save()
      .then((saved) => {
        console.log("userSaved", saved);
        res.status(200).json({ message: "User Saved successfully" });
      })
      .catch((err) => {
        console.error("Error saving user:", err);
        res.status(500).json({ message: "Failed to save user" });
      });
  },
  googleLogin: async (req: Request, res: Response) => {
    console.log(req.body.credential, "req credentials");

    const token = req.body.credential;
    const decoded = jwt.decode(token);
    console.log(decoded, "token");

    if (typeof decoded === "object" && decoded !== null) {
      const { email, jti } = decoded as JwtPayload;
      try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
          res.send("User not found");
        } else {
          if (user.status === false) {
            res.status(200).send({ message: "User Blocked" });
          }
          let token;
          token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1hr",
          });
          res.status(200).send({ success: true, token: token });
        }
      } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal server error");
      }
    }
  },
  editUsername: async (req: Request, res: Response) => {
    const { username, currentusername } = req.body;
    console.log(username, currentusername);

    // Ensure that the UserModel is correctly defined and imported

    // Find the user by their current username and update it
    const updatedUser = await UserModel.findOneAndUpdate(
      { username: currentusername },
      { username: username },
      { new: true }
    );

    if (!updatedUser) {
      // If the user is not found, return an error response
      return res.status(404).json({
        msg: "User not found.",
      });
    }

    console.log(updatedUser, "updated name");

    res.status(200).json({
      msg: "Successfully updated",
      data: updatedUser,
      success: true,
    });
  },
  editProfile: async (req: Request, res: Response) => {
    try {
      console.log("hello phtototo");
      console.log(req.body);

      const { userId } = req.body;
      console.log(userId, "this is the user");

      const { image } = req.body;
      console.log(image);

      let cloudImageUrls = [];
      const images = req.files as Express.Multer.File[];
      if (images && images.length > 0) {
        for (const image of images) {
          const result = await cloudinary.uploader.upload(image.path);
          cloudImageUrls.push(result.secure_url);
        }
      }
      const userProfile = await UserModel.findByIdAndUpdate(
        userId,
        { image: cloudImageUrls, story: cloudImageUrls },
        { new: true }
      );
      console.log(userProfile, "this is userProfile");

      // Send the response once, either as JSON or with a status code
      res.status(200).json({
        message: "Successfully uploaded photo",
        data: userProfile,
        success: true,
      });
    } catch (error) {
      console.error("Error in editProfile:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  },

  getPOst: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body.user;
      const { search } = req.body;

      const user = await UserModel.findById(userId);
    } catch (error) {}
  },
  ForgotPassword: async (req: Request, res: Response) => {
    const { email } = req.body;
    await UserModel.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.send({ message: "User not existed" });
      }
      verificationEmail(email, user?.username);
      res.status(200).send({ message: "Redirect to reset Password" });
    });
  },
  SetPassword: async (req: Request, res: Response) => {
    try {
      const { username, newToken } = req.params;

      const user = await UserModel.findOne({ username: username });
      if (!user) {
        return res.status(400).send("Invalid User");
      }
      const resetToken = await Verify.findOne({ username, newToken });
      console.log(resetToken, "here with token");

      if (!resetToken) {
        res.status(400).send("inValid password rest Link");
      }

      res.json({ username, newToken });
    } catch (error) {}
  },
  NewPassword: async (req: Request, res: Response) => {
    try {
      const { username, newToken } = req.body;

      console.log(req.body, "first body");

      let password = req.body.newPassword;
      console.log(password, "password is here");

      const user = await UserModel.findOne({ username });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await user.updateOne({ password: hashedPassword });

      await user.save();

      if (!user) return res.status(400).send("Invalid user");

      const resetToken = await Verify.findOne({ username, token: newToken });

      if (!resetToken) return res.status(400).send("Invalid token");

      await resetToken.deleteOne({ username: username, token: newToken });

      res.status(200).send("Password reset successful");
    } catch (error) {
      console.log(error);
      res.status(500).send("AN error occured");
    }
  },
  userPost: async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      console.log(userId, "this is userid");
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID format",
        });
      }

      const userPost = await Posts.find({
        userId: new ObjectId(userId),
      }).populate("userId");
      console.log(userPost, "this is hani post");
      res.status(200).json({
        success: true,
        message: "all post are here",
        data: userPost,
      });
    } catch (error) {
      console.log(error);
    }
  },
  FriendProfile: async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      console.log(username, "this is friend username");
      const friendProfile = await UserModel.findOne({ username: username });
      res.status(200).json({
        data: friendProfile,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default userController;
