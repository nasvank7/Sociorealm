import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import SearchUser from "../../../components/chatUser/SearchUser";
import Chats from "../../../components/chatUser/Chats";
import { TbMessages } from "react-icons/tb";

const Chat = () => {
  return (
    <div className="h-screen w-full flex relative">
      <div className=" lg:border-r-2 lg:border-l-2   border-opacity-75 lg:w-1/5 ml-4 my-4   sticky">
        <Navbar />
      </div>

      <div className="hidden lg:block w-1/4  shadow-md   border-opacity-75  ">
      <SearchUser />
      
      </div>
      <div className="w-full h-full lg:w-4/5 flex flex-col justify-center items-center  mr-4 my-4  border-opacity-75 overflow-y-auto scrollbar-hidden">
        <div className="lg:hidden w-full flex ">
         <SearchUser />
        </div>
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
