import React, { useEffect, useState } from "react";
import FullPost from "../Posts/FullPost";
import { axiosInstance } from "../../services/userApi/axiosInstance";
// import "./Modal.css"; // Import your CSS for modal styles

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
}

interface Story {
  username: string;
  story: string;
}

const HomeComponents = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [images, setImage] = useState<string>("");
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(30); // Countdown timer

  useEffect(() => {
    axiosInstance.get("/getPost").then((res) => {
      setPosts(res.data.data);
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/getAlluser");
        if (Array.isArray(response?.data)) {
          const Allusers = response.data;
          const Alluser = Allusers.filter((user: any) => user.story.length > 0);
          setStories(Alluser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const openStoryModal = () => {
    setStoryModalOpen(true);
    setCountdown(30); // Reset countdown when modal opens
  };

  const closeStoryModal = () => {
    setStoryModalOpen(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (storyModalOpen) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setCountdown(30); // Reset countdown when modal closes
    }

    return () => clearInterval(timer); // Cleanup on unmount or re-render
  }, [storyModalOpen]);

  useEffect(() => {
    if (countdown === 0) {
      closeStoryModal(); // Automatically close modal after 30 seconds
    }
  }, [countdown]);

  const storyModal = () => {
    if (!storyModalOpen) return null;

    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 rounded-lg shadow-lg w-[300px] z-50">
        <div className="relative">
          {/* Progress bar */}
          <div className="h-1 bg-gray-200 rounded-lg w-full overflow-hidden">
            <div
              className="h-1 bg-blue-500"
              style={{
                width: `${(countdown / 30) * 100}%`,
                transformOrigin: "left",
                transform: "scaleX(1)",
              }}
            ></div>
          </div>
          {/* <button
            className="absolute top-0 right-0 m-2 p-2 rounded-full bg-gray-300 hover:bg-gray-400"
            onClick={closeStoryModal}
          >
            &times;
          </button> */}
        </div>

        <div className="text-center mt-4">
          <img
            src={images}
            alt=""
            className="h-full object-contain rounded w-full"
          />
        </div>

        {/* <div className="text-center mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={closeStoryModal}
          >
            Close
          </button>
        </div> */}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      {storyModal()}
      <section className="flex flex-row overflow-x-auto mt-2 bg-gray-200">
        {stories.map((story, index) => (
          <div
            key={index}
            className="w-24 h-24 flex-shrink-0 flex flex-col items-center m-2"
          >
            {story.story.length > 0 && (
              <>
                <div
                  onClick={() => {
                    openStoryModal(), setImage(story.story);
                  }}
                  className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden cursor-pointer"
                >
                  <img
                    src={story.story}
                    alt={story.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs mt-1 text-center text-white">
                  {story.username}
                </p>
              </>
            )}
          </div>
        ))}
      </section>
      <section className="flex flex-col w-full justify-center items-center mt-4">
        {posts.length !== 0 ? (
          posts.map((post, index) => (
            <div
              key={post._id}
              className="max-w-full flex items-center justify-center"
            >
              <FullPost postDetails={post} />
            </div>
          ))
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
