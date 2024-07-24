import React, { useState } from "react";
import { GetUsernameFromRedux } from "../../../services/redux/UserinRedux";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../modal/Modal";
import DropdownModal from "../../modal/DropdownModal";

interface User {
  _id: string;
  username: string;
  image: string;
}

interface Post {
  _id: string;
  userId: User;
  description: string;
  likes: string[];
  image: string;
  saved: string[];
  createdAt: string;
}


interface HeaderProps {
  username: string;
  image: string;
  postDetails: Post;
}

const Header: React.FC<HeaderProps> = ({ username, image, postDetails }) => {
  const userDetails = GetUsernameFromRedux();
  const [show, setShow] = useState(false);

  return (
    <div className="flex items-center  w-full mt-3">
      <div className="flex items-center w-full">
        {userDetails?.username === username ? (
          <Link to="/userProfile" className="flex items-center">
            <img
              src={image}
              alt=""
              className="rounded-full w-8 h-8 object-contain"
            />
            <h2 className="font-bold cursor-pointer ml-2">{username}</h2>
          </Link>
        ) : (
          <Link to={`/user/${username}`} className="flex items-center">
            <img
              src={image}
              alt=""
              className="rounded-full w-10 h-10 object-contain"
            />
            <h2 className="font-bold cursor-pointer ml-2">{username}</h2>
          </Link>
        )}
      </div>
      <BsThreeDotsVertical
        className="cursor-pointer"
        size={22}
        onClick={() => setShow(true)}
      />
      {show && (
        <div className="ml-3">
          <Modal
            show={setShow}
            user={userDetails?.username === postDetails.userId?.username}
            post={postDetails}
            userId={userDetails?._id ?? ""}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
