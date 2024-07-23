import React, { useEffect, useState } from "react";
import FullPost from "../Posts/FullPost";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { array } from "yup";
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
  createdAt: string;
  // Assuming "image" is a URL
}

const HomeComponents = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    axiosInstance.get("/getPost").then((res) => {
      console.log(res.data, "helooooooooooo the post is here");
      console.log(res.data.description);

      setPosts(res.data.data);
    });
  }, []);

  const stories = [
    { image: "https://via.placeholder.com/150", username: "user1" },
    { image: "https://via.placeholder.com/150", username: "user2" },
    { image: "https://via.placeholder.com/150", username: "user3" },
    { image: "https://via.placeholder.com/150", username: "user4" },
    { image: "https://via.placeholder.com/150", username: "user5" },
    { image: "https://via.placeholder.com/150", username: "user6" },
    { image: "https://via.placeholder.com/150", username: "user7" },
    { image: "https://via.placeholder.com/150", username: "user8" },
    { image: "https://via.placeholder.com/150", username: "user9" },
    { image: "https://via.placeholder.com/150", username: "user10" },
    { image: "https://via.placeholder.com/150", username: "user10" },
    { image: "https://via.placeholder.com/150", username: "user10" },
    { image: "https://via.placeholder.com/150", username: "user10" },
    { image: "https://via.placeholder.com/150", username: "user10" },
    { image: "https://via.placeholder.com/150", username: "user10" },
    { image: "https://via.placeholder.com/150", username: "user10" },
    { image: "https://via.placeholder.com/150", username: "user10" },
    { image: "https://via.placeholder.com/150", username: "user10" },
  ];

  return (
    <div className="container">
      <section className="flex flex-row overflow-y-auto mt-2 bg-gray-200">
        {stories.map((story, index) => (
          <div className="w-24 h-24 flex-shrink-0 flex flex-col items-center m-2">
            <div className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden">
              <img
                src={story.image}
                alt={story.username}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs mt-1 text-center text-white">
              {story.username}
            </p>
          </div>
        ))}
      </section>
      <section className=" flex flex-col w-full  justify-center items-center  ">
        {posts?.length !== 0 ? (
          posts?.map((post1, index, array) => {
            const post = array[array?.length - 1 - index];
            return (
              <div className="max-w-full flex items-center justify-center">
                <FullPost postDetails={post} />
              </div>
            );
          })
        ) : (
          <p className="flex justify-center items-center h-screen">
            No posts for you
          </p>
        )}
      </section>
    </div>
  );
};

export default HomeComponents;
