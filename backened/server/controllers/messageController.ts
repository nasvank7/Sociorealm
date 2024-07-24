import { Request, Response, response } from "express"
import { Message } from "../models/Message"
import { UserModel } from "../models/users"


const messageController = {
    PostMessage: async (req: Request, res: Response) => {
        try {
            const { from, to, message } = req.body
            const newMessage = await Message.create({
                message: message,
                ChatUsers: [from, to],
                Sender: from
            })
            return res.status(200).json(newMessage)
        } catch (error) {
            console.log(error);
            return res.status(500).json("internal server error")

        }

    },
    GetMEssage: async (req: Request, res: Response) => {
        try {
            console.log("these is for getting messages");

            const from = req.params.senderId;
            const to = req.params.recievedId;
            console.log(from, to, "theser are from to");


            const newMessage = await Message.find({
                ChatUsers: {
                    $all: [from, to]
                }
            }).sort({ updatedAt: 1 })
            const allMessage = newMessage.map((msg) => {
                return {
                    myself: msg.Sender.toString() === from,
                    message: msg.message
                }
            })
            console.log(allMessage, "the chatr messages");


            return res.status(200).json(allMessage)
        } catch (error) {
            console.log(error);
            return res.status(500).json("Internal server error")

        }
    }, getChatUser: async (req: Request, res: Response) => {
        try {
            const { userId } = req.params
            console.log(userId, "this is the id of user");
            const user = await UserModel.findById(userId)
            console.log(user, "this is the user");
            res.status(200).json(user)
        } catch (error) {
            console.log(error);

        }



    },
    getAllChats: async (req: Request, res: Response) => {
        try {
            const { userId } = req.body;

            const messages = await Message.find({
                ChatUsers: { $in: [userId] }
            }).populate('ChatUsers', '_id name'); 

            const uniqueUserIDs = <string[]>[]

            messages.map((message) => {
                message.ChatUsers.map((userIds) => {
                    console.log(userIds);
                    if (userIds !== userId) {
                        if (!uniqueUserIDs?.includes(userIds)) {
                            uniqueUserIDs.push(userIds)
                        }

                    }
                })
            })

            const users = await UserModel.find({ _id: { $in: Array.from(uniqueUserIDs) } });
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching chats:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default messageController
