import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

interface Post {
  _id: string;
  userId: {
    id: string;
    username: string;
  };
  description: string;
  likes: string;
  image: string;
  saved: string;
  // Assuming "image" is a URL
}

const Explores = () => {
  const nav = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    axiosInstance.get("/getPost").then((res) => {
      console.log(res.data, "helooooooooooo the post is here");
      console.log(res.data.description);
      setPosts(res.data.data);
    });
  }, []);

  return (
    <div className="grid lg:grid-cols-4 grid-cols-4 p-4">
      {posts?.map((post: any) => (
        <motion.div
          key={post._id}
          transition={{ duration: 0.5 }}
          className="card w-full p-2"
          onClick={() => nav(`/post/${post._id}`)}
        >
          <motion.img
            src={post.image}
            alt=""
            className="w-[250px] h-[400px] object-contain"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Explores;
