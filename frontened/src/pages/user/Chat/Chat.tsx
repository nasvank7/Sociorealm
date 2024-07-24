import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import SearchUser from "../../../components/chatUser/SearchUser";
import Chats from "../../../components/chatUser/Chats";
import { TbMessages } from "react-icons/tb";

const Chat = () => {
  return (
    <div className="h-screen w-full flex relative">
      <div className="  border-r-2 border-l-2 border-opacity-75 w-1/4 ml-4 my-4    sticky">
        <Navbar />
      </div>

      {/* <div className="w-1.5/4 rounded-3xl shadow-md   border-opacity-75  ">
        <SearchUser />
      </div> */}
      <div className="flex flex-col w-3/4  rounded-3xl border-r-2    border-opacity-75 border-l-2 justify-center items-center">
        <span className="">
          <TbMessages size={50} className="border rounded-2xl border-black" />
        </span>
        <h1 className="font-bold text-2xl">Your messages</h1>
        <h1 className="font-bold">Please select the Chats you want</h1>
      </div>
    </div>
  );
};

export default Chat;
