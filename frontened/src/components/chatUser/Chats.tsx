import { format, isToday, isYesterday, subDays } from "date-fns";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import SearchUser from "./SearchUser";
import Navbar from "../Navbar/Navbar";
import { io, Socket } from "socket.io-client";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
import { axiosInstance } from "../../services/userApi/axiosInstance";
// import { formatDateLabel } from "./utils"; // Adjust the import path as needed

const Chat = () => {
  const { userId } = useParams<{ userId: string }>();
  const userDetails = GetUsernameFromRedux();
  const [messages, setMessages] = useState<any[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const socket = useRef<Socket | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  const formatDateLabel = (dateString:any) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (date >= subDays(new Date(), 2)) {
      return "Day before Yesterday";
    } else {
      return format(date, "MMMM dd, yyyy");
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/getAlluser");
        if (Array.isArray(response?.data)) {
          const Allusers = response.data;
          const Alluser = Allusers.filter((user: any) => user._id === userId);
          setUsers(Alluser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchAllMessagesWithThisCurrentUser = async () => {
      try {
        const response = await axiosInstance.get(
          `/get/chat/msg/${userDetails?._id}/${userId}`
        );
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
      socket.current.emit("joinChat", { userId: userDetails?._id });
    }

    socket.current.on("receive_message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { myself: false, message: message.content, timestamp: message.timestamp },
      ]);
    });

    socket.current.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [userId, userDetails]);

  const sendMessage = useCallback(async () => {
    if (currentMessage.trim() !== "" && socket.current) {
      const timestamp = new Date().toISOString();
      const message = {
        userId,
        sender: userDetails?._id,
        content: currentMessage,
        timestamp,
      };

      socket.current.emit("send_message", message);

      await axiosInstance.post("/msg", {
        from: userDetails?._id,
        to: userId,
        message: currentMessage,
        timestamp,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { myself: true, message: currentMessage, timestamp },
      ]);
      setCurrentMessage("");
    }
  }, [currentMessage, userId, userDetails]);

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const dateLabel = formatDateLabel(message.timestamp);
    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }
    groups[dateLabel].push(message);
    return groups;
  }, {});

 
  return (
    <div className="h-screen w-full flex relative">
      <div className="hidden lg:block border-l-2 border border-opacity-75 lg:w-1/4 ml-4 my-4 sticky">
        <Navbar />
      </div>

      <div className=" hidden lg:block lg:w-1/4 border mr-4 my-4 border-opacity-75">
        <SearchUser />
      </div>

      <div className=" w-full lg:w-4/5 border mr-4 my-4 border-opacity-75 border-l-2">
        <div className="h-full flex flex-col">
          <div className="h-16 mt-2 mx-2 border rounded-xl flex flex-row items-center gap-x-4 bg-gray-400">
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

          <div className="chat-container flex flex-col justify-between h-full pb-14">
            <div className="messages flex flex-col w-full overflow-y-auto p-4 space-y-4">
              {Object.keys(groupedMessages).map((dateLabel) => (
                <div key={dateLabel} className=" flex flex-col ">
                  <div className="date-label text-center text-gray-500 mb-2">
                    {dateLabel}
                  </div>
                  {groupedMessages[dateLabel].map((msg:any, index:any) => (
                    <div
                      key={index}
                      className={`message m-2  max-w-xs p-2 rounded-lg  ${msg.myself
                        ? "bg-blue-500 self-end text-white text-left "
                        : "bg-gray-300 self-start text-left "
                        }`}
                    >
                      <p>{msg.message}</p>
                      <span className="text-xs text-gray-600">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
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
