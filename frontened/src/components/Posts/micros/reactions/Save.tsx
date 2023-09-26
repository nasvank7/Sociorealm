import React from "react";
import { BiDownload } from "react-icons/bi";
import { BsBookmarkPlus, BsBookmarkPlusFill } from "react-icons/bs";

const Save = (props:any) => {
  const { saved } = props;
  return (
    <>
      {saved ? (
        <BsBookmarkPlusFill
          color="green"
          className="w-10 h-8 flex ml-32 cursor-pointer "
        />
      ) : (
        <BsBookmarkPlus
          className="w-10 h-8 flex ml-32 cursor-pointer"
          size={25}
        />
      )}
    </>
  );
};

export default Save;
