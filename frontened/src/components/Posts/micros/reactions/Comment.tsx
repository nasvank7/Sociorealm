import React, { useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import CommentScreen from "../../Comment";

interface CommentProps {

    _id: string;
    userId: {
      _id: string;
      username: string;
      image: string;
    };
    description: string;
    likes: string[];
    image: string;
    saved: string[];
    createdAt: string;
 
}
interface FullPostProps {
  postDetails: CommentProps;
}
const Comment: React.FC<FullPostProps> = ({ postDetails }) => {
  const [showBox, setShowBox] = useState(false);
  return (
    <>
      {showBox && <CommentScreen show={setShowBox} post={postDetails} />}
      <span className="cursor-pointer" onClick={() => setShowBox(true)}>
        <AiOutlineComment className="sm:w-6 md:w-8 lg:w-10 h-8 " />
      </span>
    </>
  );
};

export default Comment;
