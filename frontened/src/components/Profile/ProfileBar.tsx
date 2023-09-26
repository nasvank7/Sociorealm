import React, { useState, useEffect } from "react";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import FullPost from "../Posts/FullPost";
interface Post {
  _id: string;
  userId: {
    id: string;
    username: string;
    image: string;
  };
  description: string;
  likes: string;
  image: string;
  saved: string;
  createdAt:string;
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
  const [showFollowing,setShowFollowing]=useState(false)
  const [followerList,setFollowerList]=useState<any>([])
  const [followingList,setFollowingList]=useState<any>([])
  console.log(username, "///");
  useEffect(() => {
    axiosInstance.get(`/userPost/${username?._id}`).then((response) => {
      console.log(response.data, "the response data is here");
      setPosts(response?.data?.data);
    });
  }, []);
  useEffect(() => {
    const data = {
      params: {
        userId: username?._id,
      },
    };
    axiosInstance.get("/userFollower", data).then((res) => {
      console.log(res,"the user follower");
      
      setFollower(res.data?.users[0]?.follower?.length);
      setFollowing(res.data?.users[0]?.following?.length);
    });
  }, []);

  const savedPost = (userId: any) => {
    console.log(userId);

    axiosInstance.get(`/savedPost/${userId}`).then((res) => {
      setSavedPOst(res?.data?.data);
      setShowSaved(true);
    });
  };
  const showPopupFollower =async () => {
    
     await axiosInstance.get(`/userFollowerlist/${username?._id}`).then((res)=>{
        console.log(res.data.data[0].follower,"follower list");
        if (res.data?.data[0]?.follower) {
          setFollowerList(res.data.data[0].follower);
        }
      })
   
    setShowFollowers(true);
  };
 const showPopupFollowing=async()=>{
  await axiosInstance.get(`/userFollowinglist/${username?._id}`).then((res)=>{
    console.log(res.data.data[0].following,"following list");
    if (res.data?.data[0]?.following) {
      setFollowingList(res.data.data[0].following);
    }
  })
  setShowFollowing(true)
 }
  return (
    // <div className="flex flex-col md:flex-row ml-6 md:ml-24 md:mt-28">
    //   <div className="mb-4 md:mb-0 ">
    //     <img
    //       src=""
    //       alt=""
    //       className="w-56 h-48 md:w-38 md:h-60 lg:w-64 lg:h-64 xl:w-64 xl:h-64 border-zinc-950 border rounded-3xl"
    //     />

    //   </div>
    //   <div className="flex flex-col gap-4 ml-0 md:ml-10 mt-4 md:mt-14">
    //     <div className="flex flex-row gap-8 md:gap-6">
    //       <h1 className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl italic">
    //         {username?.username}
    //       </h1>
    //       <Link to='/editProfile'>
    //       <FiEdit className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 mt-2 cursor-pointer" />
    //       </Link>
    //       <h1 className="text-lg md:text-xl w-24 h-10 md:w-24 md:h-12 lg:w-24 lg:h-12 xl:w-24 xl:h-12 border border-gray-950 rounded text-center text-red-600 font-bold">
    //         Logout
    //       </h1>
    //     </div>
    //     <div className="flex flex-row gap-14 md:gap-6">
    //       <div className="flex flex-col">
    //         <h1 className="font-bold text-lg md:text-xl">Posts</h1>
    //         <h1 className="">2 Posts</h1>
    //       </div>
    //       <div className="flex flex-col">
    //         <h1 className="font-bold text-lg md:text-xl">Followers</h1>
    //         <h1 className="">2 Followers</h1>
    //       </div>
    //       <div className="flex flex-col">
    //         <h1 className="font-bold text-lg md:text-xl">Following</h1>
    //         <h1 className="">2 Following</h1>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <section className="pt-16 bg-blueGray-50 w-full h-full">
      <div className="w-full lg:w-full md:w-full px-4 mx-auto">
        <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                    alt="..."
                    src={username?.image}
                    className="shadow-xl rounded-full  h-32 w-32 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px "
                  />
                </div>
              </div>
              <div className="w-full px-4 text-center mt-20">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {posts?.length}
                    </span>
                    <span className="text-sm text-blueGray-400">Posts</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {follower?follower:"0"}
                    </span>
                    <span
                      className="text-sm text-blueGray-400 cursor-pointer"
                      onClick={showPopupFollower}
                    >
                      Followers
                    </span>
                    {showFollowers && (
                    
                      <div className="bg-white shadow-md rounded-lg overflow-y-auto">
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
                          {followerList.map((follower:any)=>(
                                 <div className="border-gray-950  shadow-2xl p-3  justify-between flex overflow-y-auto ">
                                  <img src={follower?.image} className="w-10 h-10 rounded-lg shadow-md" alt="" />
                                         <p className="text-sm text-gray-500 font-semibold">
                                {follower.username}
                               </p>
                                 </div>
                              
                         ))}
                        </div>
                        <div className="bg-gray-100 p-4">
                        
                         
                          <p className="text-sm text-gray-500">
                          My follower are my strength
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 ">
                      {following?following:"0"}
                    </span>
                    <span className="text-sm text-blueGray-400 cursor-pointer" onClick={showPopupFollowing}>Following</span>
                    {showFollowing && (
                    
                    <div className="bg-white shadow-md rounded-lg overflow-y-auto">
                      {/* Card content */}
                      <div
                     className="fixed top-0 left-0 right-0 bottom-0 z-10"
                     onClick={() => setShowFollowing(false)}
                   ></div>
                      <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                         Following
                        </h2>
                        {followingList.map((following:any)=>(
                                 <div className="border-gray-950 shadow-2xl p-3 justify-between flex ">
                                  <img src={following?.image} className="w-10 h-10 rounded-lg shadow-md" alt="" />
                                         <p className="text-sm text-gray-500  font-semibold">
                                {following.username}
                               </p>
                                 </div>
                              
                         ))}
                      </div>
                      <div className="bg-gray-100 p-4">
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
              <div className=" grid md:grid-cols-3 grid-cols-1 p-4    mt-10 py-10 border-t border-blueGray-200 text-center">
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
                    <p className="flex justify-center items-center h-screen">
                      No saved posts for you
                    </p>
                  )
                ) :  posts.length !== 0 ? (
                  posts.map((post1, index, array) => {
                    const post = array[array.length - 1 - index];
                    return (
                      <div className="w-full p-4 " key={post._id}>
                        <FullPost postDetails={post} />
                      </div>
                    );
                  })
                ) : (
                  <p className="flex justify-center items-center h-screen">
                    No posts for you
                  </p>
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
