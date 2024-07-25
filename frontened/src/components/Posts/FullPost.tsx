import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import Header from "./micros/Header";
import moment from "moment";
import Like from "./micros/reactions/Like";
import Comment from "./micros/reactions/Comment";
import Save from "./micros/reactions/Save";
import Share from "./micros/reactions/Share";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
import { io, Socket } from "socket.io-client";

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

interface FullPostProps {
  postDetails: Post;
}

const FullPost: React.FC<FullPostProps> = ({ postDetails }) => {
  const userDetails = GetUsernameFromRedux();
  const [postDetailsFrom, setPostDetailsFrom] = useState<Post>(postDetails);
  const [liked, setLiked] = useState<boolean>(
    postDetails?.likes?.includes(userDetails?._id || "")
  );
  const [saved, setSaved] = useState<boolean>(
    postDetails?.saved?.includes(userDetails?._id || "")
  );
  const [likesCount, setLikeCount] = useState<number>(
    postDetails?.likes?.length
  );
  const socket = useRef<Socket | null>(null);
  socket.current = io("http://localhost:3001");
  useEffect(() => {
    setPostDetailsFrom(postDetails);
    setLiked(postDetails?.likes?.includes(userDetails?._id || ""));
    setSaved(postDetails?.saved?.includes(userDetails?._id || ""));
    setLikeCount(postDetails?.likes?.length);
  }, [postDetails, userDetails]);

  const handleLike = async (newLikedState: boolean) => {
    const data = {
      postId: postDetailsFrom._id,
      userId: userDetails?._id,
      value: newLikedState,
    };

    try {
      const response = await axiosInstance.patch("/liked", data);
      if (response.status === 200) {
        setLiked(newLikedState);
        setLikeCount((prevCount) =>
          newLikedState ? prevCount + 1 : prevCount - 1
        );
        if (socket.current) {
          socket.current.emit("likePost", {
            postId: {
              _id: postDetailsFrom.userId._id,
              description: postDetailsFrom.description,
              image: postDetailsFrom.image
            },
            userId: userDetails?._id,
            senderId: {
              _id: userDetails?._id,
              username: userDetails?.username,
              image: userDetails?.image,
              // Other properties of senderId
            },
            type: "like",
          });
        }
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleSave = async (foo: boolean) => {
    const data = {
      postId: postDetailsFrom?._id.toString(), // Ensure it's a string
      userId: userDetails?._id.toString(), // Ensure it's a string
      value: foo,
    };

    try {
      const response = await axiosInstance.patch("/save", data);
      if (response.status === 200) {
        setSaved(foo);
      }
    } catch (error) {
      console.error("Error saving the post:", error);
    }
  };

  return (
    <div
      id={postDetailsFrom._id}
      className="border w-full max-w-[350px] flex flex-col border-solid mt-2 rounded-xl shadow-md"
      key={postDetailsFrom._id}
    >
      <div className="flex flex-row justify-evenly">
        <Header
          username={postDetailsFrom?.userId?.username}
          image={postDetailsFrom?.userId?.image}
          postDetails={postDetailsFrom}
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
            src={postDetailsFrom?.image}
            alt="Post"
            className="w-[20rem] h-[30rem] object-contain rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-row w-full space-x-6 flex-nowrap">
        <div className="flex justify-evenly w-1/2">
          <span>
            <Like
              liked={liked}
              postDetails={postDetailsFrom}
              onLike={handleLike}
            />
          </span>
          <span>
            <Comment postDetails={postDetailsFrom} />
          </span>
        </div>
        <div className="flex justify-evenly w-1/2">
          <span className="py-2">
            <Save
              saved={saved}
              postDetails={postDetailsFrom}
              onSave={handleSave}
            />
          </span>
          <span>
            <Share postDetails={postDetailsFrom} />
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
          <span className="font-bold">{postDetailsFrom?.userId?.username}</span>
          <span className="cursor-pointer select-none ml-10 font-semibold">
            {postDetailsFrom?.description}
          </span>
        </div>
        <span>{moment(postDetailsFrom?.createdAt)?.fromNow()}</span>
      </div>
    </div>
  );
};

export default FullPost;
