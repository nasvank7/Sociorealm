import React, { useState, useEffect } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { Link } from "react-router-dom";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";

interface ShowProps {
  show: (isVisible: boolean) => void;
}

const Search: React.FC<ShowProps> = ({ show }) => {
  const userDetails = GetUsernameFromRedux();
  const [searchUser, setSearchUser] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axiosInstance.get('/getAlluser').then((res) => {
      setSearchUser(res.data);
    });
  }, []);

  const filteredUser = searchTerm
    ? searchUser.filter((user) =>
      user.username?.toLowerCase()?.includes(searchTerm.trim()?.toLowerCase())
    )
    : [];
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent closing if clicked inside the search container
    if (!e.currentTarget.contains(e.target as Node)) {
      show(false);
    }
  };

  return (
    <>
      {/* <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-900 bg-opacity-70" onClick={handleOverlayClick}></div> */}
      <div className="container w-full h-full max-w-md mx-auto  rounded-lg bg-gray-900 text-white shadow-lg  ">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
          <span className="cursor-pointer" onClick={() => show(false)}>
            <IoArrowBackCircle size={35} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="flex-grow px-4 py-2 ml-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none"
          />
        </div>
        <div className="px-4 py-2">
          {filteredUser.length === 0 ? (
            <p className="text-center text-gray-400 mt-4">No users found</p>
          ) : (
            filteredUser.map((user) => (
              <Link
                key={user.id}
                to={userDetails?.username === user.username ? '/userProfile' : `/user/${user.username}`}
                className="block rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out mb-2"
              >
                <div className="flex items-center space-x-4 py-2">
                  <img
                    src={user.image || "/avatar.jpg"}
                    alt=""
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <p className="text-lg">{user.username}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
