import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import SearchUser from "./SearchUser";
import Navbar from "../Navbar/Navbar";
import { io, Socket } from "socket.io-client";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
import { axiosInstance } from "../../services/userApi/axiosInstance";

const Chat = () => {
  const { userId } = useParams<{ userId: string }>();
  const userDetails = GetUsernameFromRedux();
  const [messages, setMessages] = useState<any[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const socket = useRef<Socket | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/getAlluser");
        console.log(response?.data, "users is here");
        if (Array.isArray(response?.data)) {
          const Allusers = response.data;
          const Alluser = Allusers.filter(
            (user: any) => user._id === userId
          );
          console.log(Alluser, Allusers, "These are users");

          setUsers(Alluser);
        }
      } catch (error) { }
    };
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchAllMessagesWithThisCurrentUser = async () => {
      try {
        const response = await axiosInstance.get(
          `/get/chat/msg/${userDetails?._id}/${userId}`
        );
        console.log({ response });

        if (Array.isArray(response?.data)) {
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchAllMessagesWithThisCurrentUser();
  }, [userId, userDetails?._id]);

  useEffect(() => {
    socket.current = io("http://localhost:3001");

    socket.current.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.current.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    if (userDetails?._id) {
      console.log(`Joining chat room: ${userId}`);
      socket.current.emit("joinChat", { userId: userDetails?._id });
    }

    socket.current.on("receive_message", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, { myself: false, message: message.content }]);
    });

    // Listen for any errors
    socket.current.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.current?.disconnect();
      console.log("Disconnected from socket server");
    };
  }, [userId, userDetails]);

  const sendMessage = useCallback(async () => {
    if (currentMessage.trim() !== "" && socket.current) {
      const message = {
        userId,
        sender: userDetails?._id,
        content: currentMessage,
      };

      console.log("Sending message:", message);
      socket.current.emit("send_message", message);
      const sendMessage = await axiosInstance.post("/msg", {
        from: userDetails?._id,
        to: userId,
        message: currentMessage,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { myself: true, message: currentMessage },
      ]); // Add the message to local state
      setCurrentMessage(""); // Clear the input field after sending
    }
  }, [currentMessage, userId, userDetails]);

  return (
    <div className="h-screen w-full flex relative">
      <div className="border-l-2  border border-opacity-75 w-1/4 ml-4 my-4  sticky">
        <Navbar />
      </div>

      <div className="w-1.5/4 rounded-3xl border mr-4 my-4  border-opacity-75">
        <SearchUser />
      </div>

      <div className="w-3/4  rounded-3xl border mr-4 my-4 border-opacity-75 border-l-2">
        <div className="h-full relative flex flex-col">
          <div className="h-16 mt-2 mx-2  border rounded-xl flex flex-row items-center  gap-x-4 bg-gray-400">
            <div>
              <img
                src={users[0]?.image}
                className="object-contain w-10 h-10 rounded-full"
                alt=""
              />
            </div>
            <div className="font-semibold">
              <p>{users[0]?.username}</p>
            </div>
          </div>

          <div className="chat-container flex flex-col justify-between h-full">
            <div className="messages flex flex-col w-full  overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message max-w-xs p-2 rounded-lg ${msg.myself
                    ? "bg-blue-500 self-end text-white text-left"
                    : "bg-gray-300 self-start text-left"
                    }`}
                >
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>

            <div className="message-input flex items-center p-4">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg p-2"
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
