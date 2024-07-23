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
          className="sm:w-6 md:w-8 lg:w-10 h-8 flex py-2  cursor-pointer "
        />
      ) : (
        <BsBookmarkPlus
          className="sm:w-6 md:w-8 lg:w-10 flex  cursor-pointer"
          size={25}
        />
      )}
    </>
  );
};

export default Save;
