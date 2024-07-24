import React, { FC, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Register from "./pages/user/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/user/Login/Login";
import Home from "./pages/user/Home/Home";
import NewPost from "./pages/user/Post/NewPost";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./pages/admin/Login/AdminLogin";
import AdminHome from "./pages/admin/Home/AdminHome";
import UserList from "./components/admin/userList/UserList";
import ForgotPassword from "./components/Forgot-Password/ForgotPassword";
import Password from "./components/Forgot-Password/Password";
import Profile from "./pages/user/Profile/Profile";
import EditProfile from "./pages/user/Profile/EditProfile";
import Explore from "./pages/user/Explore/Explore";
import SinglePost from "./pages/SinglePost/SinglePost";
import Chats from "./components/chatUser/Chats";
import Friend from "./pages/user/Profile/Friend";
import PostList from "./components/admin/Post/PostList";
import Chat from "./pages/user/Chat/Chat";
import Report from "./components/admin/Report/Report";
import { useSelector } from "react-redux";
import RootState from "./services/redux/Store/rooteState";
import { ThemeState } from "./services/redux/slices/themeSlice";
import ThemeToggle from "./pages/Theme/ThemeToggle";
import { io, Socket } from "socket.io-client";
import { GetUsernameFromRedux } from "./services/redux/UserinRedux";

const App: React.FC = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const userDetails = GetUsernameFromRedux();
  console.log({ themeMode });
  const socket = useRef<Socket | null>(null);
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

    // socket.current.on("receive_message", (message) => {
    //   console.log("Received message:", message);
    //   setMessages((prevMessages) => [...prevMessages, { myself: false, message: message.content }]);
    // });

    // Listen for any errors
    socket.current.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.current?.disconnect();
      console.log("Disconnected from socket server");
    };
  }, [ userDetails]);
  return (
    <>
      <div
        className={`App ${themeMode === "dark" ? "dark:bg-dark" : ""}`}
        style={{
          backgroundColor: themeMode === "dark" ? "black" : "white",
          color: themeMode === "dark" ? "white" : "black",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/newPost" element={<NewPost />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/password-reset/:username/:newToken"
              Component={Password}
            />
            <Route path="/userProfile" element={<Profile />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chatuser/:userId" element={<Chats />} />
            <Route path="/post/:postId" Component={SinglePost} />
            <Route path="/user/:username" Component={Friend} />

            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/usersList" element={<UserList />} />
            <Route path="/postList" element={<PostList />} />
            <Route path="/report" element={<Report />} />
          </Routes>
          <ToastContainer theme="dark" autoClose={3000} />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
