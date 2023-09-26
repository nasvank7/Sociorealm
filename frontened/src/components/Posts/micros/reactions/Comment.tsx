import React, { useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import CommentScreen from "../../Comment";
interface CommentProps {
  _id: string;
  userId: {
    id: string;
    username: string;
  };
  description: string;
  likes: string;
  image: string;
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
        <AiOutlineComment className="w-10 h-8 " />
      </span>
    </>
  );
};

export default Comment;
