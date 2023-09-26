import React,{useEffect, useState} from "react";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
import{BsSearch}  from 'react-icons/bs'
import { Link, useNavigate } from "react-router-dom";
const SearchUser = () => {
  const nav=useNavigate()
  const userDetails=GetUsernameFromRedux()
  const [users,setUsers]=useState<any[] >([])
  const [searchUser,setSearchUser]=useState('')
    useEffect(() => {
        axiosInstance.get('/getAlluser').then((res) => {
          console.log(res.data, "these are chat users data");
          setUsers(res.data)
        });
      }, []);
      const searchHandler=()=>{
        const filteredUser=users.filter((user)=>
        user.username && user.username.toLowerCase().includes(searchUser.toLowerCase())
        )
         setUsers(filteredUser)
      }
  return (
    <div className="h-full ">
      <div className="flex  justify-center">
      <div className="mt-4 px-3 flex-col relative">
          <input
            value={searchUser}
            type="text"
            placeholder="Search users..."
            className="border rounded-xl pl-3 pr-10" // Add left and right padding
            onChange={(e)=>setSearchUser(e.target.value)}
          />
          <BsSearch
            className="absolute right-5 cursor-pointer top-3 text-gray-400 " // Adjust position as needed
            size={20} 
            onClick={searchHandler}
          />
        </div>
      </div>
      
  
    {
    users.map((users:any)=>(
      <div className="flex flex-row border rounded-xl border-solid border-stone-950 mt-5 mx-2 bg-slate-300">
      <img
        src={users.image}
        alt=""
        className="w-10 h-10 rounded-full items-center justify-center "
      />
      <div className="flex justify-between">
        <p className="font-semibold mt-1 ml-2">{users.username}</p>
        
        <p className="mt-1 justify-end items-center flex ml-6 ">
          <BsFillChatSquareTextFill className="cursor-pointer" onClick={()=>nav(`/chatuser/${users?._id}`)}  />
        </p>
         
      </div>
    </div>
    )

    )}
    
    </div>
  );
};

export default SearchUser;
