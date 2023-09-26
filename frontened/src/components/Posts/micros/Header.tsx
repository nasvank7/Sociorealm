import React, { useState } from "react";
import { GetUsernameFromRedux } from "../../../services/redux/UserinRedux";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../modal/Modal";
import DropdownModal from "../../modal/DropdownModal";
interface Post {
  _id: string;
  userId: {
    id: string;
    username: string;
    image:string;
  };
  description: string;
  likes: string;
  image: string;
  saved:string;
  createdAt:string
}

interface HeaderProps {
  username: string;
  image: string;
  postDetails:Post
}

const Header: React.FC<HeaderProps> = ({ username, image ,postDetails }) => {
  const userDetails = GetUsernameFromRedux();
const[show,setShow]=useState(false)

  return (
    <>
      <div className="flex flex-col  mt-3  ">
        <span className="flex justify-between items-center px-4  ">
          {userDetails?.username === username ? (
            <Link to="/userProfile" >
              <img src={image} alt="" className="rounded-full w-8 h-8  " />
              <h2 className="font-bold flex justify-center  items-center mr-36 cursor-pointer  ml-10">
                {username}{" "}
              </h2>
              
            </Link>
          ) : (
            <Link to={`/user/${username}`}>
              <img src={image} alt="" className="rounded-full w-12 h-12 " />
              <h2 className="font-bold flex justify-start mr-36 items-center cursor-pointer">
                {username}{" "}
              </h2>
            </Link>
          )}
          <BsThreeDotsVertical
            className="flex items-start justify-center cursor-pointer  "
            size={22} onClick={()=>setShow(true)}
          />
      
        </span>
        <div className="flex justify-end mr-3">

        {show && <Modal show={setShow} user={userDetails?.username===postDetails.userId?.username}    post={postDetails}
            userId={userDetails?._id ??""}/>}
        </div>
      </div>
    </>
  );
};

export default Header;
