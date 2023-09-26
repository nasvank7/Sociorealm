import jwt from "jsonwebtoken";
import { UserModel } from "../models/users";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  userId: string;
  role: string;

  // other properties in the token if any
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("/////////////");

    let token = req.header("authorization").split(" ")[1];
    console.log(token, "yuyyyyyyy");

    token = token.replaceAll('"', "");
    const decryptedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as JwtPayload;
    console.log(decryptedToken, "decryptedtoken");
    req.body.userId = decryptedToken;

    await UserModel.findById(req.body.userId).then((res) => {
      console.log(res, "////////");
      if (res.isBlocked === false) {
        throw new Error("jwt expired");
      } else {
        next();
      }
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export default auth;
