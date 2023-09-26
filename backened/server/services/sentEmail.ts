import {createTransport} from 'nodemailer';

export const sentEmail=async(
    email:string,
    subject:string,
    text:string,

)=>{
    try {
        const transporter=createTransport({
            service:'gmail',
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })

        await transporter.sendMail({
            from:process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log("email sent");
    } catch (error) {
        console.log("email not sent");
        console.error(error);
    }
}