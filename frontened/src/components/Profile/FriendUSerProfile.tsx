import React, { useState, useEffect } from "react";
import FullPost from "../Posts/FullPost";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { useParams } from "react-router-dom";
import axios from "axios";

import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
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

interface UserProfile {
  _id: string;
  username: string;
  isFollowing: boolean;
  image: string;
}
const FriendUSerProfile = () => {
  const defaultIcon = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png";
  const userDetails = GetUsernameFromRedux();
  const { username } = useParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [follower, setFollower] = useState<any>([]);
  const [following, setFollowing] = useState<any>([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followerList, setFollowerList] = useState<any>([]);
  const [followingList, setFollowingList] = useState<any>([]);
  useEffect(() => {
    axiosInstance.get(`/friendProfile/${username}`).then((res) => {
      console.log(res, "response is here for friend profile");
      setUser(res.data.data);
    });
  }, [username]);
  useEffect(() => {
    axiosInstance.get(`/friendPost/${username}`).then((res) => {
      console.log(res, "the friends post are here");
      setPosts(res.data.data);
    });
  }, [username]);
  // ...

  useEffect(() => {
    if (userDetails && userDetails._id) {
      const data = {
        params: {
          userId: user?._id,
        },
      };
      axiosInstance.get("/follow", data).then((res) => {
        console.log(res, "follow response");
        console.log(res.data.users, "the data of user");
        console.log(userDetails._id, "logged-in user");

        setFollower(res.data?.users[0]?.follower.length);
        setFollowing(res.data?.users[0]?.following.length);
        const isFollowing = res.data?.users[0]?.follower.includes(
          userDetails._id
        );
        console.log(isFollowing, "is following the logged-in user");

        setUser((prevUser) => ({
          ...prevUser,
          isFollowing,
          _id: prevUser?._id ?? "",
          username: prevUser?.username ?? "",
          image: prevUser?.image ?? "",
        }));
      });
    }
  }, [userDetails]);

  // ...

  // ...

  const handleFollow = async () => {
    console.log(user?._id);

    const data = {
      userId: userDetails?._id,
      OppoId: user?._id,
    };

    try {
      await axiosInstance.post("/follow", data);
      setFollower(follower + 1);
      setUser((prevUser) => ({
        ...prevUser,
        isFollowing: true,
        _id: prevUser?._id ?? "",
        username: prevUser?.username ?? "",
        image: prevUser?.image ?? "",
      }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleunfollow = async () => {

    const data = {
      userId: userDetails?._id,
      OppoId: user?._id,
    };
    try {
      await axiosInstance.post("/unfollow", data);
      setFollower(follower - 1);
      setUser((prevUser) => ({
        ...prevUser,
        isFollowing: false,
        _id: prevUser?._id ?? "",
        username: prevUser?.username ?? "",
        image: prevUser?.image ?? "",
      }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };


  const showPopupFollower = async () => {
    setShowFollowers(true);
    await axiosInstance
      .get(`/userFollowerlist/${user?._id}`)
      .then((res) => {
        console.log(res.data.data[0].follower, "follower list");
        if (res.data?.data[0]?.follower) {
          setFollowerList(res.data.data[0].follower);
        }
      });

  };
  const showPopupFollowing = async () => {
    setShowFollowing(true);
    await axiosInstance
      .get(`/userFollowinglist/${user?._id}`)
      .then((res) => {
        console.log(res.data.data[0].following, "following list");
        if (res.data?.data[0]?.following) {
          setFollowingList(res.data.data[0].following);
        }
      });
  };

  // ...

  return (
    <section className="pt-16 bg-blueGray-50 w-full h-full">
      <div className="w-full lg:w-full md:w-full px-4 mx-auto">
        <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                    alt="..."
                    src={user?.image ? user?.image : defaultIcon}
                    className="object-contain shadow-xl rounded-full h-32 w-32 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] "
                  />
                </div>
              </div>
              <div className="w-full px-4 text-center mt-20">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {posts.length}
                    </span>
                    <span className="text-sm text-blueGray-400">Posts</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {follower ? follower : "0"}
                    </span>
                    <span className="text-sm text-blueGray-400 cursor-pointer" onClick={showPopupFollower}>Followers</span>
                    {showFollowers && (
                      <div className=" shadow-md rounded-lg   overflow-y-auto">
                        {/* Card content */}
                        <div
                          className="fixed top-0 left-0 right-0 bottom-0 "
                          onClick={() => setShowFollowers(false)}
                        ></div>
                        <div className="p-4 h-[300px]  overflow-y-auto ">
                          <h2 className="text-xl font-semibold text-gray-800">
                            Followers
                          </h2>
                          <p>hello</p>
                          {followerList.map((follower: any) => (
                            <div className="border-gray-950  shadow-2xl p-3  justify-between flex  ">
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
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {following ? following : "0"}
                    </span>
                    <span className="text-sm text-blueGray-400 cursor-pointer" onClick={showPopupFollowing}>Following</span>
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
              <h3 className="text-xl font-bold italic leading-normal  text-blueGray-700 mb-2">
                {user?.username}
              </h3>
              {user?.isFollowing ? (
                <button
                  className="bg-slate-600 rounded text-cyan-50 font-semibold w-[5rem]"
                  onClick={handleunfollow}
                >
                  unfollow
                </button>
              ) : (
                <button
                  className="bg-slate-600 rounded text-cyan-50 font-semibold w-[5rem]"
                  onClick={handleFollow}
                >
                  follow
                </button>
              )}
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-row justify-center gap-20">
                <h1 className="font-semibold text-xl cursor-pointer">post</h1>
                <h1 className="font-semibold text-xl">ADS</h1>
              </div>
              <div className=" grid md:grid-cols-3 grid-cols-1 p-4    mt-10 py-10 border-t border-blueGray-200 text-center">
                {posts.length !== 0 ? (
                  posts.map((post1, index, array) => {
                    const post = array[array.length - 1 - index];
                    return (
                      <div className="w-full p-4 justify-center" key={post._id}>
                        <FullPost postDetails={post} />
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full  grid col-span-3">
                    <p className="flex justify-center items-start w-full">
                      No posts
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

export default FriendUSerProfile;
