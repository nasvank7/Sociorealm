import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SearchUser from "./SearchUser";
import Navbar from "../Navbar/Navbar";
import Header from "../Posts/micros/Header";
import { io, Socket } from "socket.io-client";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { BsInfoCircle } from "react-icons/bs";
import { VscSend } from "react-icons/vsc";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";

const Chat = () => {
  const userDetails = GetUsernameFromRedux();
  console.log(userDetails?._id, "this is current userId");
  const senderId = userDetails ? userDetails._id : null;
  console.log(senderId, "sender id");

  const socket = useRef<Socket | null>(null);
  const { userId } = useParams();
  const [chatUSer, setChatUser] = useState<any>();
  const [message, setMessage] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  console.log(userId, "this is my reciever id");
  useEffect(() => {
    axiosInstance.get(`/chatUSer/${userId}`).then((res) => {
      console.log(res, "this is user eresponse");
      setChatUser(res.data);
    });
  }, [userId]);

  useEffect(() => {
    const getMessage = () => {
      axiosInstance.get(`/get/chat/msg/${senderId}/${userId}`).then((res) => {
        console.log("jsfiuyasifgasidgfaouygd");

        console.log(res, "this is message response");

        setMessage(res.data);
      });
    };
    getMessage();
  }, [userId]);
  console.log(message, "these are the messages");

  useEffect(() => {
    if (chatUSer !== "") {
      socket.current = io("http://localhost:3001");
      socket.current.emit("join_room", userDetails?.username);
    }
  }, [userDetails?.username]);
  console.log(socket, "this is socket");

  const sentMsg = async () => {
    const messages = {
      mySelf: true,
      message: inputMessage,
    };

    const data = {
      from: senderId,
      to: userId,
      message: inputMessage,
    };
    if (socket.current) {
      socket.current.emit("send_message", {
        to: chatUSer?._id,
        from: senderId,
        message: inputMessage,
      });
    }
    await axiosInstance.post("/msg", data).then((res) => {
      console.log(res);

      setMessage(message.concat(messages));
    });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("recieve_message", (msg) => {
        console.log(msg);

        setArrivalMessage({ mySelf: false, message: msg });
      });
    }
  }, [arrivalMessage]);
  useEffect(() => {
    arrivalMessage && setMessage((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <div className="h-screen w-full flex relative">
      <div className="border-l-4 border border-black border-opacity-75 w-1/4 ml-4 my-4  rounded-3xl  sticky">
        <Navbar />
      </div>

      <div className="w-1.5/4 bg-gray-100 rounded-3xl border mr-4 my-4 border-black border-opacity-75  ">
        <SearchUser />
      </div>
      <div className=" w-3/4 bg-gray-100 rounded-3xl border mr-4 my-4 border-black border-opacity-75 border-l-2">
        <div className="h-full relative flex flex-col">
          <div className=" h-16 mt-2 mx-2 bg-slate-400 border rounded-xl  flex flex-row items-center  justify-between ">
            <div className="ml-4">
              <img
                src={chatUSer?.image}
                className="w-12 h-12 rounded-3xl"
                alt=""
              />
            </div>
            <div>
              <h2 className="font-bold">{chatUSer?.username}</h2>
            </div>
            <div className=" mr-4">
              <BsInfoCircle className="cursor-pointer" size={20} />
            </div>
          </div>
          <div className="msgcontainer overflow-y-auto">
            {message.map((item: any, index) => {
              if (item.mySelf) {
                return (
                  <div
                    className="flex flex-row items-end justify-end"
                    key={index}
                  >
                    <div className="flex w-10 justify-end items-center border rounded-lg bg-slate-500">
                      {item.message}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="flex justify-start items-start rounded-lg w-10 bg-red-700"
                    key={index}
                  >
                    {item.message}
                  </div>
                );
              }
            })}
          </div>

          <div className=" flex flex-grow items-end justify-center mb-3 sticky">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-auto rounded-lg "
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <VscSend
              size={30}
              className=" top-1/2 transform -translate-y-1/2 left-3  text-gray-500 cursor-pointer"
              onClick={sentMsg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
