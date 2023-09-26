import React, { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { useSelector } from "react-redux";
import RootState from "../../services/redux/Store/rooteState";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddPost = () => {
  const imgInput = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const nav = useNavigate();
  const userCred = useSelector((state: RootState) => state.user.userCred);
  console.log(userCred, "userCredentials here");

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    try {
      setImage(URL.createObjectURL(file));
    } catch (error) {}
  };
  const handleSubmit = async () => {
    try {
      if (!imgInput.current) {
        console.error("Image input element not found.");
        return;
      }
      const selectedFile = imgInput.current.files && imgInput.current.files[0];
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("description", description);
      if (userCred) {
        formData.append("userId", userCred?._id as string);
      }
      const response = await axiosInstance.post("/newPost", formData);
      toast.success("Post created successfully");
      nav("/");
      console.log("Response from the backend:", response.data);
      setImage("");
      setDescription("");
      if (imgInput.current) {
        imgInput.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
  return (
    <>
      <div className="container sm:px-10 px-0">
        <div className="border-b-2 border-t-2 border-current w-full py-3 mt-2">
          <h1 className="underline text-3xl">New Post</h1>
        </div>
        <div className="flex-col flex items-center justify-between pt-10">
          <div
            className="relative cursor-pointer border-current border-2 rounded-md overflow-hidden  w-[23.95rem] h-[13.6rem] mt-3"
            onClick={() => imgInput.current?.click()}
          >
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <AiOutlinePlus size={40} color="white" />
            </span>
            <img src={image} alt="" className=" w-[23.95rem] h-[13.6rem]" />
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              name="image"
              ref={imgInput}
              onChange={handleImage}
              className="cursor-pointer hidden"
            />
          </div>
          <div className="pt-8 pb-5 w-full flex justify-center">
            <div className="flex-col flex sm:w-[80%] w-[100%]">
              <label htmlFor="" className="text-lg">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={description}
                className="w-full outline-none focus:outline-none bg-transparent px-5 border-current border-2 h-10 rounded-lg"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <span className="text-sm text-red-500"></span>
          <div className="w-[80%]">
            <span className="cursor-pointer flex justify-end"></span>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-transparent border-2 border-current p-1 px-5 rounded-xl  hover:bg-gray-700 text-center cursor-pointer"
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPost;
