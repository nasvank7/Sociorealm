import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import SearchUser from "./SearchUser";
import Navbar from "../Navbar/Navbar";
import { io, Socket } from "socket.io-client";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";

const Chat = () => {
  const { userId } = useParams<{ userId: string }>();
  const userDetails = GetUsernameFromRedux();
  const [messages, setMessages] = useState<any[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io("http://localhost:3001"); // replace with your server URL

    // Check if socket is connected
    socket.current.on("connect", () => {
      console.log("Connected to socket server");
    });

    // Check if socket failed to connect
    socket.current.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Join chat room
    if (userId) {
      console.log(`Joining chat room: ${userId}`);
      socket.current.emit("joinChat", { userId });
    }

    // Listen for incoming messages
    socket.current.on("receive_message", (message) => {
      console.log("///////||||||||||")
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for any errors
    socket.current.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.current?.disconnect();
      console.log("Disconnected from socket server");
    };
  }, [userId,userDetails,messages]);

  const sendMessage = useCallback(() => {
    if (currentMessage.trim() !== "" && socket.current) {
      const message = {
        userId,
        sender: userDetails?._id,
        content: currentMessage,
      };

      console.log("Sending message:", message);
      socket.current.emit("send_message", message);
      setMessages((prevMessages) => [...prevMessages, message]); // Add the message to local state
      setCurrentMessage(""); // Clear the input field after sending
    }
  }, [currentMessage, userId, userDetails]);

  return (
    <div className="h-screen w-full flex relative">
      <div className="border-l-4 border border-black border-opacity-75 w-1/4 ml-4 my-4 rounded-3xl sticky">
        <Navbar />
      </div>

      <div className="w-1.5/4 bg-gray-100 rounded-3xl border mr-4 my-4 border-black border-opacity-75">
        <SearchUser />
      </div>

      <div className="w-3/4 bg-gray-100 rounded-3xl border mr-4 my-4 border-black border-opacity-75 border-l-2">
        <div className="h-full relative flex flex-col">
          <div className="h-16 mt-2 mx-2 bg-slate-400 border rounded-xl flex flex-row items-center justify-between"></div>

          <div className="chat-container flex flex-col justify-between h-full">
            <div className="messages flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message max-w-xs p-2 rounded-lg ${
                    msg.sender === userDetails?._id
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-300 self-start"
                  }`}
                >
                  <p>{msg.content}</p>
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
