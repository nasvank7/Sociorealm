import React, { useCallback, useEffect, useState } from 'react';
import { BsFillChatSquareTextFill, BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { GetUsernameFromRedux } from '../../services/redux/UserinRedux';
import { axiosInstance } from '../../services/userApi/axiosInstance';
import { debounce } from 'lodash';

const AddChatModal = ({ onClose }: { onClose: () => void }) => {
    const nav = useNavigate();
    const userDetails = GetUsernameFromRedux();
    const [users, setUsers] = useState<any[]>([]);
    const [searchUser, setSearchUser] = useState("");
    const [filteredUser, setFilteredUser] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/getAlluser");
                console.log(response?.data, "users is here");
                if (Array.isArray(response?.data)) {
                    const Allusers = response.data;
                    const Alluser = Allusers.filter(
                        (user: any) => user._id !== userDetails?._id
                    );
                    console.log(Alluser, Allusers, "These are users");

                    setUsers(Alluser);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchData();
    }, [userDetails]);

    const handleSearch = useCallback(
        debounce((query) => {
            const filteredUser = users.filter(
                (user) =>
                    user.username &&
                    user.username.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredUser(filteredUser);
        }, 300),
        [users]);

    const joinChat = (userId: string) => {
        nav(`/chatuser/${userId}`);
        onClose();
    };
    useEffect(() => {
        handleSearch(searchUser);
    }, [searchUser, handleSearch]);
    const handleClickOutside = (e: any) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen min-h-screen modal-overlay  bg-opacity-50" onClick={handleClickOutside}>
            <div className="bg-white p-4 rounded-lg shadow-lg w-[300px] z-50 relative">
                <div className="flex flex-col h-[300px] overflow-y-auto">
                    <div className="mt-4 px-3 flex items-start relative">
                        <input
                            value={searchUser}
                            type="text"
                            placeholder="Search users..."
                            className="border rounded-xl pl-3 pr-10"
                            onChange={(e) => setSearchUser(e.target.value)}
                        />
                        <BsSearch
                            className="absolute right-5 cursor-pointer top-3 text-gray-400"
                            size={20}
                        />
                    </div>
                    <div className='flex flex-col justify-center items-center w-full'>
                        {searchUser && filteredUser.length > 0 && (
                            <>
                                {filteredUser.map((user) => (
                                    <div
                                        key={user._id}
                                        className="w-full flex flex-row border justify-between items-center p-2 rounded-xl border-solid border-gray-300 shadow-md mt-5 mx-2"
                                    >
                                        <div>
                                            <img
                                                src={user.image}
                                                alt=""
                                                className="w-10 h-10 rounded-full"
                                            />
                                        </div>
                                        <div className="flex">
                                            <p className="font-semibold mt-1 ml-2">{user.username}</p>
                                        </div>
                                        <div>
                                            <p className="mt-1 justify-end items-center flex ml-6">
                                                <BsFillChatSquareTextFill
                                                    className="cursor-pointer"
                                                    onClick={() => joinChat(user._id)}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddChatModal;
