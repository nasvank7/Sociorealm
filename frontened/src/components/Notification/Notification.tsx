import React, { useState, useEffect, useRef } from "react";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
import { io, Socket } from "socket.io-client";

interface showProps {
  show: (isVisible: boolean) => void;
}
interface Notification {
  _id: string;
  userId: string;
  type: "like" | "comment";
  postId: {
    _id: string;
    description: string;
    image: string;
    // Other properties of postId
  };
  senderId: {
    _id: string;
    username: string;
    image: string;
    // Other properties of senderId
  };
  msgCount: number;
  read: boolean;
  createdAt: string; // You can use a Date type if preferred
  __v: number;
}
const Notification: React.FC<showProps> = ({ show }) => {
  const user = GetUsernameFromRedux();
  const socket = useRef<Socket | null>(null);
  socket.current = io("http://localhost:3001");




  const [notification, setNotification] = useState<Notification[]>([]);
  useEffect(() => {
    // const socket = io("http://localhost:5000"); // Replace with your backend URL

    // // Join room based on user ID
    // socket.emit("join", user?._id);



    // Listen for incoming notifications
    if (socket.current) {
      if (user?._id) {
        socket.current.emit("joinChat", { userId: user?._id });
      }
      socket.current.on("notification", (newNotification) => {
        console.log("New notification received:", newNotification);
        // Add new notification to state
        setNotification((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);
      });
      socket.current.on("notificationComment", (newNotification) => {
        console.log("New notification received:", newNotification);
        // Add new notification to state
        setNotification((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);
      });
    }

    // return () => {
    //   socket.current.disconnect(); // Clean up socket connection
    // };
  }, [user?._id]);
  useEffect(() => {
    axiosInstance.get(`/notification/${user?._id}`).then((res) => {
      console.log(res, "notification response");
      setNotification(res.data.notification);
    });
  }, []);

  const handleClear = async () => {
    await axiosInstance.delete(`/clearAll/${user?._id}`).then((res) => {
      console.log(res);
      setNotification([]);
    });
  };
  return (
    <>
      {/* <div
        className="fixed top-0 left-0 right-0 bottom-0 "
        onClick={() => show(false)}
      ></div> */}
      <div className="h-full w-[17rem] bg-gray-900 py-4  shadow-2xl border-l-4   border-r-4   border-zinc-950 rounded-lg  z-20 overflow-y-auto">
        <div className="flex justify-center w-ful">
          <h1 className="text-white">Notifications</h1>
        </div>
        <div>
          <div className="flex justify-end mr-8 mt-3">
            <p
              className="text-xs text-white cursor-pointer"
              onClick={handleClear}
            >
              clear all{" "}
            </p>
          </div>
          {notification.map((notification) => (
            <div
              key={notification._id}
              className="flex flex-row  items-center shadow-2xl bg-white rounded-xl mt-5 mx-3"
            >
              <img
                src={notification.senderId.image}
                className="w-10 h-10 rounded-full"
                alt="user"
              />
              {notification.type === "like" && (
                <p className="text-sm">
                  {notification.senderId.username} liked your post
                </p>
              )}
              {notification.type === "comment" && (
                <p className="text-sm">
                  {notification.senderId.username} commented on your post
                </p>
              )}
              <img
                src={notification?.postId?.image}
                className="w-10 h-10 rounded-xl"
                alt="post"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notification;
