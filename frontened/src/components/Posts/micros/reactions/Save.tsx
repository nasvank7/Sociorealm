import React, { useEffect, useState } from "react";
import { BsBookmarkPlus, BsBookmarkPlusFill } from "react-icons/bs";
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

interface SaveProps {
  saved: boolean;
  postDetails: PostDetails;
  onSave: (saved: boolean) => void;
}

const Save: React.FC<SaveProps> = ({ saved, postDetails, onSave }) => {

  const userDetails = GetUsernameFromRedux();
  const [isSaved, setIsSaved] = useState(saved);

  useEffect(() => {
    if (userDetails?._id) {
      const myselfSaved = postDetails?.saved?.includes(userDetails?._id);
      setIsSaved(myselfSaved);
    }
  }, [postDetails, userDetails]);

  const handleClick = () => {
    if (userDetails?._id) {
      const newSavedState = !isSaved;
      onSave(newSavedState);
      setIsSaved(newSavedState);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer flex items-center ">
      {isSaved ? (
        <BsBookmarkPlusFill color="green" className="sm:w-6 md:w-8 lg:w-10 h-10 flex " />
      ) : (
        <BsBookmarkPlus className="sm:w-6 md:w-8 lg:w-10 h-10 flex " />
      )}
    </div>
  );
};

export default Save;
