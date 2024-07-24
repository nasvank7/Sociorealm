import React, { useEffect, useState, useRef, useCallback } from "react";
import { BsFillChatSquareTextFill, BsSearch } from "react-icons/bs";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
import { Link, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { debounce } from "lodash";
import { BsChatLeftTextFill } from "react-icons/bs";
import AddChatModal from "./addChatModal";
const SearchUser = () => {
  const nav = useNavigate();
  const userDetails = GetUsernameFromRedux();
  const [users, setUsers] = useState<any[]>([]);
  const [searchUser, setSearchUser] = useState("");
  const [filteredUser, setFilteredUser] = useState<any[]>([]);
  const [allChats, setAllChats] = useState<any[]>([])
  const [searchModal, setShowSearchModal] = useState<boolean>(false)
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io("http://localhost:3001"); // replace with your server URL

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/getAlluser");
        console.log(response?.data, "users is here");
        if (Array.isArray(response?.data)) {
          const Allusers = response.data;
          const Alluser = Allusers.filter(
            (user: any) => user._id !== userDetails?._id
          );
          console.log(Alluser, Allusers, "These are users");

          setUsers(Alluser);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [userDetails]);

  const handleSearch = useCallback(
    debounce((query) => {
      const filteredUser = users.filter(
        (user) =>
          user.username &&
          user.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUser(filteredUser);
    }, 300),
    [users]
  );
  console.log({ users });

  console.log({ searchUser });
  console.log({ filteredUser });

  const joinChat = (userId: string) => {
    if (socket.current) {
      // socket.current.emit('joinChat',{userId});
      nav(`/chatuser/${userId}`);
    }
  }

  useEffect(() => {
    handleSearch(searchUser);
  }, [searchUser, handleSearch]);

  useEffect(() => {
    const fetchAllChats = async () => {
      try {
        const response = await axiosInstance.post(`getAllChatsOfuser`, {
          userId: userDetails?._id
        })
        if (Array.isArray(response?.data)) {
          setAllChats(response?.data)
        }
      } catch (error) {

      }
    }
    fetchAllChats()
  }, [userDetails?._id])
  
  const handleCloseModal = () => {
    setShowSearchModal(false);
  };

  return (
    <div className="h-full  overflow-y-auto">
      <div className="w-full flex items-end justify-end ">
        <div className="w-full  flex items-center justify-end h-10 px-4">
          <BsChatLeftTextFill onClick={() => setShowSearchModal(true)} />
        </div>
      </div>
      {/* <div className="flex justify-center">
        <div className="mt-4 px-3 flex-col relative">
          <input
            value={searchUser}
            type="text"
            placeholder="Search users..."
            className="border rounded-xl pl-3 pr-10"
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <BsSearch
            className="absolute right-5 cursor-pointer top-3 text-gray-400"
            size={20}
          />
        </div>
      </div> */}
      {/* {searchUser &&
        filteredUser.length >
        0 && (
          <>
            {filteredUser.map((user) => (
              <div
                className="flex flex-row border justify-between items-center p-2 rounded-xl border-solid border-gray-300 shadow-md mt-5 mx-2 "
                key={user._id}
              >
                <div>
                  <img
                    src={user.image}
                    alt=""
                    className="w-10 h-10 rounded-full items-center justify-center"
                  />
                </div>
                <div className="flex">
                  <p className="font-semibold mt-1 ml-2">{user.username}</p>
                </div>
                <div>
                  <p className="mt-1 justify-end items-center flex ml-6">
                    <BsFillChatSquareTextFill
                      className="cursor-pointer"
                      onClick={() => joinChat(user._id)}
                    />
                  </p>
                </div>
              </div>
            ))}
          </>
        )} */}
      {
        allChats.length > 0 && (<>
          {allChats.map((user) => (
            <>
              <div
                className="flex flex-row border justify-between items-center p-2 rounded-xl border-solid border-gray-300 shadow-md mt-5 mx-2 "
                key={user._id}
              >
                <div>
                  <img
                    src={user.image}
                    alt=""
                    className="w-10 h-10 rounded-full items-center justify-center"
                  />
                </div>
                <div className="flex">
                  <p className="font-semibold mt-1 ml-2">{user.username}</p>
                </div>
                <div>
                  <p className="mt-1 justify-end items-center flex ml-6">
                    <BsFillChatSquareTextFill
                      className="cursor-pointer"
                      onClick={() => joinChat(user._id)}
                    />
                  </p>
                </div>
              </div>
            </>
          ))}

        </>)
      }
      {searchModal && <AddChatModal onClose={handleCloseModal} />}
    </div>
  );
};

export default SearchUser;
