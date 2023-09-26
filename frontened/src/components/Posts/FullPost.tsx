import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import Header from "./micros/Header";
import moment from "moment";

import Like from "./micros/reactions/Like";
import Comment from "./micros/reactions/Comment";
import Save from "./micros/reactions/Save";
import Share from "./micros/reactions/Share";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
import { toast } from "react-toastify";

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

interface FullPostProps {
  postDetails: Post;
}
const FullPost: React.FC<FullPostProps> = ({ postDetails }) => {
  const userDetails = GetUsernameFromRedux();
  const likesArray = postDetails.likes
  ? Array.isArray(postDetails.likes)
    ? postDetails.likes.join(",")
    : postDetails.likes.split(",")
  : [];

  const userId = userDetails ? userDetails._id : "";
  const likeStatus = userId ? likesArray.includes(userId) : undefined;
  const saveStatus=postDetails.saved?.includes(userId) ?? false;
  const [liked, setLiked] = useState(likeStatus);
  const [saved, setSaved] = useState(saveStatus);
  const [likesCount, setLikeCount] = useState(
    Array.isArray(postDetails?.likes) ? postDetails.likes.length : 0
  );
  let width = "600";
  let dp,
    desc = "";
  if (width === "600") {
    dp = "text-xl";
    desc = "text-lg";
  }

  const handleLike = async (foo: any) => {
    const data = {
      postId: postDetails?._id || "",
      userId: userDetails?._id || "",
      value: foo,
    };
    console.log(data, "THIS IS DATA");
    console.log(postDetails);
    try {
      setLiked(foo);
      if (foo) {
        setLikeCount(likesCount + 1);
      } else {
        if (likesCount !== 0) {
          setLikeCount(likesCount - 1);
        }
      }
      const response = await axiosInstance.patch("/liked", data);
      if (response.status === 200) {
        setLiked(foo);
        if (foo) {
          setLikeCount(likesCount + 1);
        } else {
          if (likesCount !== 0) {
            setLikeCount(likesCount - 1);
          }
        }
      }
    } catch (error) {
      setLiked(!foo);
      console.log(error);
    }
  };

  const handleSave =async (foo: any) => {
    const data = {
      postId: postDetails._id,
      userId: userDetails?._id,
      value: foo,
    };
   try {
    setSaved(foo)
    await axiosInstance.patch('/save',data)
   
   } catch (error) {
    
   }
  };
  const headerUsername = postDetails?.userId?.username || "";
const headerImage = postDetails?.userId?.image || "";

  return (
    <div id={postDetails._id}
      className="card border w-full border-solid mt-2 rounded-xl shadow-md "
      key={postDetails._id}
    >
      <Header  username={headerUsername} image={headerImage} postDetails={postDetails} />
      <div className="flex justify-between items-center">
        <div className="mb-2 ml-4 flex gap-5 items-center">
          <span className="text-xs text-gray-400"></span>
        </div>
      </div>

      <>
        <div className="mt-2 flex justify-between mx-4">
          <div className="flex justify-between gap-3 ">
            <img
              src={postDetails.image}
              alt="Post"
              className="w-[20rem] h-[30rem] object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="ml-6 my-1 select-none flex  ">
          <span onClick={() => handleLike(!liked)}>
            <Like liked={liked} />
             
          </span>
          <h2></h2>
          <span>
            <Comment postDetails={postDetails} />
          </span>
          <span onClick={() => handleSave(!saved)}>
            <Save saved={saved}  />
          </span>
          <span>
            <Share postDetails={postDetails} />
          </span>
        </div>
        <div className="ml-6   flex flex-col">
          <div className="">

          <span className="font-semibold">{likesCount>0?likesCount:""} likes </span>
          </div>
          <div className="pb-4 flex ">
            <span className="font-bold ">{postDetails.userId?.username}</span>
          <span className="cursor-pointer select-none ml-10 font-semibold" >
            
            {postDetails?.description}
          </span>
         
          </div>
          <span>{moment(postDetails?.createdAt ?? '20-08-2023').fromNow()}</span>
        </div>
      </>
    </div>
  );
};

export default FullPost;
