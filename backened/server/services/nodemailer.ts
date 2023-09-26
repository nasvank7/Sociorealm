import { Verify } from "../models/verify";
import crypto from 'crypto'
import { sentEmail } from "../services/sentEmail";

export const verificationEmail=async(email:string,username:string)=>{
    try {
        const newToken=crypto.randomBytes(32).toString("hex");
        await Verify.updateOne({email},{
            $set:{
                email,username,token:newToken
            }
        },{upsert:true})

        const url=`${process.env.BASE_URL}/password-reset/${username}/${newToken}`
        await sentEmail(email,"VerifyEmail",url)
    } catch (error) {
        console.log(error);
    }
}