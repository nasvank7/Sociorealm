import { log } from "console";
import React from "react";

import { FaShare } from "react-icons/fa";
const Share = (postDetails: any) => {
  // console.log(postDetails,"postDetails");
  const share = (postId: any) => {
    console.log(postId);
  };
  return (
    <>
      <FaShare
        onClick={() => share(postDetails?.postDetails?._id)}
        className="w-10 h-8 cursor-pointer"
      />
    </>
  );
};

export default Share;
