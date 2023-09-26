import React from "react";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
const Like = (props: any) => {
  const { liked } = props;
  return (
    <>
      {liked ? (
        <AiFillHeart color="red" className="w-10 h-8 cursor-pointer" />
      ) : (
        <AiOutlineHeart className="w-10 h-8 cursor-pointer" />
      )}
    </>
  );
};

export default Like;
