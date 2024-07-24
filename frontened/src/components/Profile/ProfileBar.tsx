import React, { useState, useEffect } from "react";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import FullPost from "../Posts/FullPost";
interface User {
  _id: string;
  username: string;
  image: string;
}

interface Post {
  _id: string;
  userId: User;
  description: string;
  likes: string[];
  image: string;
  saved: string[];
  createdAt: string;
}
const ProfileBar = () => {
  const username = GetUsernameFromRedux();
  console.log(username);

  const [posts, setPosts] = useState<Post[]>([]);
  const [savedpost, setSavedPOst] = useState<Post[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [follower, setFollower] = useState<any>([]);
  const [following, setFollowing] = useState<any>([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followerList, setFollowerList] = useState<any>([]);
  const [followingList, setFollowingList] = useState<any>([]);
  console.log(username, "///");
  useEffect(() => {
    axiosInstance
      .get(`/userPost/${username?._id}`)
      .then((response) => {
        console.log(response.data, "the response data is here");
        setPosts(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);
  useEffect(() => {
    const data = {
      params: {
        userId: username?._id,
      },
    };
    axiosInstance.get("/userFollower", data).then((res) => {
      console.log(res, "the user follower");

      setFollower(res.data?.users[0]?.follower?.length);
      setFollowing(res.data?.users[0]?.following?.length);
    });
  }, [username]);

  const savedPost = (userId: any) => {
    console.log(userId);

    axiosInstance.get(`/savedPost/${userId}`).then((res) => {
      setSavedPOst(res?.data?.data);
      setShowSaved(true);
    });
  };

  const showPopupFollower = async () => {
    await axiosInstance
      .get(`/userFollowerlist/${username?._id}`)
      .then((res) => {
        console.log(res.data.data[0].follower, "follower list");
        if (res.data?.data[0]?.follower) {
          setFollowerList(res.data.data[0].follower);
        }
      });

    setShowFollowers(true);
  };
  const showPopupFollowing = async () => {
    await axiosInstance
      .get(`/userFollowinglist/${username?._id}`)
      .then((res) => {
        console.log(res.data.data[0].following, "following list");
        if (res.data?.data[0]?.following) {
          setFollowingList(res.data.data[0].following);
        }
      });
    setShowFollowing(true);
  };
  return (
    <section className="pt-16  w-full h-full">
      <div className="w-full lg:w-full md:w-full px-4 mx-auto">
        <div className=" flex flex-col min-w-0 break-words  w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                    alt="..."
                    src={username?.image}
                    className="shadow-xl rounded-full object-contain  h-32 w-32 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px "
                  />
                </div>
              </div>
              <div className="w-full px-4 text-center mt-20">
                <div className="flex justify-evenly px-64 py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide ">
                      {posts?.length}
                    </span>
                    <span className="text-sm ">Posts</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide ">
                      {follower ? follower : "0"}
                    </span>
                    <span
                      className="text-sm  cursor-pointer"
                      onClick={showPopupFollower}
                    >
                      Followers
                    </span>
                    {showFollowers && (
                      <div className=" shadow-md rounded-lg overflow-y-auto">
                        {/* Card content */}
                        <div
                          className="fixed top-0 left-0 right-0 bottom-0 z-10"
                          onClick={() => setShowFollowers(false)}
                        ></div>
                        <div className="p-4">
                          <h2 className="text-xl font-semibold text-gray-800">
                            Followers
                          </h2>
                          <p>hello</p>
                          {followerList.map((follower: any) => (
                            <div className="border-gray-950  shadow-2xl p-3  justify-between flex overflow-y-auto ">
                              <img
                                src={follower?.image}
                                className="w-10 h-10 rounded-lg shadow-md"
                                alt=""
                              />
                              <p className="text-sm  font-semibold">
                                {follower.username}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className=" p-4">
                          <p className="text-sm text-gray-500">
                            My follower are my strength
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide  ">
                      {following ? following : "0"}
                    </span>
                    <span
                      className="text-sm  cursor-pointer"
                      onClick={showPopupFollowing}
                    >
                      Following
                    </span>
                    {showFollowing && (
                      <div className=" shadow-md rounded-lg overflow-y-auto">
                        {/* Card content */}
                        <div
                          className="fixed top-0 left-0 right-0 bottom-0 z-10"
                          onClick={() => setShowFollowing(false)}
                        ></div>
                        <div className="p-4">
                          <h2 className="text-xl font-semibold ">
                            Following
                          </h2>
                          {followingList.map((following: any) => (
                            <div className="border-gray-950 shadow-2xl p-3 justify-between flex ">
                              <img
                                src={following?.image}
                                className="w-10 h-10 rounded-lg shadow-md"
                                alt=""
                              />
                              <p className="text-sm   font-semibold">
                                {following.username}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className=" p-4">
                          {/* Additional content */}

                          <p className="text-sm text-gray-500">
                            My followings are my beauty
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center ">
              <h3 className="text-xl font-bold italic leading-normal   mb-2">
                {username?.username}
              </h3>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <Link to="/editProfile">
                  <FiEdit className="cursor-pointer" />
                </Link>
              </div>
              <div className="flex flex-row justify-center gap-20">
                <h1
                  className="font-semibold text-xl cursor-pointer"
                  onClick={() => savedPost(username?._id)}
                >
                  Saved
                </h1>
                <h1
                  className="font-semibold text-xl cursor-pointer"
                  onClick={() => setShowSaved(false)}
                >
                  post
                </h1>
                <h1 className="font-semibold text-xl">ADS</h1>
              </div>
              <div className="grid md:grid-cols-1 grid-cols-1 lg:grid-cols-3 p-4 mt-10 py-10 border-t border-blueGray-200 text-center">
                {showSaved ? (
                  savedpost.length !== 0 ? (
                    savedpost.map((post1, index, array) => {
                      const post = array[array.length - 1 - index];
                      return (
                        <div
                          className="w-full p-4 justify-center"
                          key={post._id}
                        >
                          <FullPost postDetails={post} />
                        </div>
                      );
                    })
                  ) : (
                    <p className="flex justify-center items-center h-screen col-span-3">
                      No saved posts for you
                    </p>
                  )
                ) : posts.length !== 0 ? (
                  posts.map((post1, index, array) => {
                    const post = array[array.length - 1 - index];
                    return (
                      <div className="w-full p-4" key={post._id}>
                        <FullPost postDetails={post} />
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full  grid col-span-3">
                    <p className="flex justify-center items-start w-full">
                      No posts for you
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileBar;
