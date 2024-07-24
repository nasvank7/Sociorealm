import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GetUsernameFromRedux } from "../../../../services/redux/UserinRedux";

interface PostDetails {
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

interface LikeProps {
  liked: boolean;
  postDetails: PostDetails;
  onLike: (liked: boolean) => void;
}

const Like: React.FC<LikeProps> = ({ liked, postDetails, onLike }) => {
  const userDetails = GetUsernameFromRedux();
  const [isLiked, setIsLiked] = useState(liked);

  useEffect(() => {
    if (userDetails?._id) {
      const myselfLiked = postDetails?.likes?.includes(userDetails?._id);
      setIsLiked(myselfLiked);
    }
  }, [postDetails, userDetails]);

  const handleClick = () => {
    if (userDetails?._id) {
      const newLikedState = !isLiked;
      onLike(newLikedState);
      setIsLiked(newLikedState);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {isLiked ? (
        <AiFillHeart color="red" className="sm:w-6 md:w-8 lg:w-10 h-8" />
      ) : (
        <AiOutlineHeart className="sm:w-6 md:w-8 lg:w-10 h-8" />
      )}
    </div>
  );
};

export default Like;
