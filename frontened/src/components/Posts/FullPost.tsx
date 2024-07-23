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
    image: string;
  };
  description: string;
  likes: string;
  image: string;
  saved: string;
  createdAt: string;
}

interface FullPostProps {
  postDetails: Post;
}
const FullPost: React.FC<FullPostProps> = ({ postDetails }) => {
  const userDetails = GetUsernameFromRedux();
  const [postDetailsfrom, setPostDetailsFrom] = useState({
    _id: "",
    userId: {
      id: "",
      username: "",
      image: "",
    },
    description: "",
    likes: "",
    image: "",
    saved: "",
    createdAt: "",
  });
  useEffect(() => {
    setPostDetailsFrom(postDetails);
  }, [postDetails]);
  const likesArray = postDetailsfrom.likes
    ? Array.isArray(postDetailsfrom.likes)
      ? postDetailsfrom.likes.join(",")
      : postDetailsfrom.likes.split(",")
    : [];

  const userId = userDetails ? userDetails._id : "";
  const likeStatus = userId ? likesArray.includes(userId) : undefined;
  const saveStatus = postDetailsfrom.saved?.includes(userId) ?? false;
  const [liked, setLiked] = useState(likeStatus);
  const [saved, setSaved] = useState(saveStatus);
  const [likesCount, setLikeCount] = useState(0);

  useEffect(() => {
    setLikeCount(postDetails?.likes?.length);
  }, [postDetails]);
  let width = "600";
  let dp,
    desc = "";
  if (width === "600") {
    dp = "text-xl";
    desc = "text-lg";
  }

  const handleLike = async (foo: any) => {
    const data = {
      postId: postDetailsfrom?._id || "",
      userId: userDetails?._id || "",
      value: foo,
    };
    console.log(data, "THIS IS DATA");
    console.log(postDetailsfrom);
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

  const handleSave = async (foo: any) => {
    const data = {
      postId: postDetailsfrom._id,
      userId: userDetails?._id,
      value: foo,
    };
    try {
      setSaved(foo);
      await axiosInstance.patch("/save", data);
    } catch (error) {}
  };
  const headerUsername = postDetailsfrom?.userId?.username || "";
  const headerImage = postDetailsfrom?.userId?.image || "";

  return (
    <div
      id={postDetailsfrom._id}
      className="  border w-full max-w-[350px] flex flex-col border-solid mt-2 rounded-xl shadow-md"
      key={postDetailsfrom._id}
    >
      <div className="flex flex-row justify-evenly">
        <Header
          username={headerUsername}
          image={headerImage}
          postDetails={postDetailsfrom}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="mb-2 ml-4 flex gap-5 items-center">
          <span className="text-xs text-gray-400"></span>
        </div>
      </div>

      <div className="mt-2 flex justify-between mx-4">
        <div className="flex justify-between gap-3">
          <img
            src={postDetailsfrom.image}
            alt="Post"
            className="w-[20rem] h-[30rem] object-contain rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-row w-full   space-x-6 flex-nowrap">
        <div className="flex justify-evenly w-1/2 ">
          <span onClick={() => handleLike(!liked)}>
            <Like liked={liked} />
          </span>
          <span>
            <Comment postDetails={postDetailsfrom} />
          </span>
        </div>
        <div className="flex justify-evenly w-1/2 ">
          <span className="py-2" onClick={() => handleSave(!saved)}>
            <Save saved={saved} />
          </span>
          <span>
            <Share postDetails={postDetailsfrom} />
          </span>
        </div>
      </div>
      <div className="ml-6 flex flex-col">
        <div>
          <span className="font-semibold">
            {likesCount > 0 ? likesCount : ""} likes{" "}
          </span>
        </div>
        <div className="pb-4 flex">
          <span className="font-bold">{postDetailsfrom.userId?.username}</span>
          <span className="cursor-pointer select-none ml-10 font-semibold">
            {postDetailsfrom?.description}
          </span>
        </div>
        <span>
          {moment(postDetailsfrom?.createdAt ?? "20-08-2023").fromNow()}
        </span>
      </div>
    </div>
  );
};

export default FullPost;
