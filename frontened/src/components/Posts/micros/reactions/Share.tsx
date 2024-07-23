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
        className="sm:w-6 md:w-8 lg:w-10 h-8 cursor-pointer"
      />
    </>
  );
};

export default Share;
