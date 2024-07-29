import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsHeartFill } from "react-icons/bs";

interface Post {
  _id: string;
  userId: {
    id: string;
    username: string;
  };
  description: string;
  likes: string[]; // Array of user IDs who liked the post
  image: string;
  saved: string;
}

const Explores = () => {
  const nav = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get("/getPost").then((res) => {
      console.log(res.data, "hello the post is here");
      setPosts(res.data.data);
    });
  }, []);

  return (
    <div className="grid lg:grid-cols-4 grid-cols-4 p-4 overflow-y-auto">
      {posts?.map((post) => (
        <motion.div
          key={post._id}
          className="card w-full flex items-start justify-start relative"
          onClick={() => nav(`/post/${post._id}`)}
          onHoverStart={() => setHoveredPostId(post._id)}
          onHoverEnd={() => setHoveredPostId(null)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={post.image}
            alt=""
            className="h-full object-contain "
            initial={{ filter: "blur(0px)" }}
            whileHover={{ filter: "blur(4px)" }}
            transition={{ duration: 0.3 }}
          />
          {hoveredPostId === post._id && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2  bg-opacity-75 rounded-full p-2 transition-opacity duration-300">
              <BsHeartFill className="text-white mr-1" />
              <span className="font-bold text-white">{post.likes.length}</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Explores;
