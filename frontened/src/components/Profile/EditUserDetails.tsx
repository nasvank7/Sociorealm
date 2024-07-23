import React, { useState, useEffect, useRef } from "react";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RootState from "../../services/redux/Store/rooteState";

const EditUserDetails = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const nav = useNavigate();
  const userDetails = GetUsernameFromRedux() ?? { username: "", image: "" };

  console.log(userDetails, "525");

  const [username, setUserName] = useState<string>(userDetails.username);
  const [image, setImage] = useState<string>(userDetails.image);
  const userCred = useSelector((state: RootState) => state.user.userCred);
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    setUserName(userDetails.username);
  }, []);

  const handleusername = (e: any) => {
    axiosInstance
      .patch("/editusername", {
        username: username,
        currentusername: userDetails.username,
      })
      .then((res) => {
        console.log(res, "updated username");
        if (res.data.success) {
          toast.success("Username updated successfully");
          setUserName(res.data.data.username);
          nav("/userProfile");
        }
      });
  };
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    try {
      setImage(URL.createObjectURL(file));
    } catch (error) {}
  };
  const uploadImage = async () => {
    try {
      if (!imageRef.current) {
        console.error("Image input element not found.");
        return;
      }

      const selectedFile = imageRef.current.files && imageRef.current.files[0];
      console.log(selectedFile, "this is selected file");

      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedFile);
      console.log(formData, "this is formData");

      if (userCred) {
        formData.append("userId", userCred?._id as string);
      }
      console.log(formData, "this is new form data");

      const response = await axiosInstance.patch("/profilephoto", formData);
      console.log(response);

      console.log("Response from the backend:", response.data);

      setImage("");

      if (imageRef.current) {
        imageRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <>
      <section className="pt-16 -50 w-full h-full overflow-y-auto">
        <div className="w-full lg:w-full md:w-full px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="">
              <div className="flex flex-col justify-center ">
                <form action="">
                  <div className="w-full px-4 flex justify-center items-center">
                    <div className="" onClick={() => imageRef.current?.click()}>
                      <img
                        alt="..."
                        src={image}
                        className="shadow-xl rounded-full h-32 w-32 align-middle border   max-w-150-px "
                      />
                      <input
                        ref={imageRef}
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        name="image"
                        className="cursor-pointer hidden"
                        onChange={handleImage}
                      />
                    </div>
                  </div>
                  <div className=" flex mt-28 items-center justify-center">
                    <button
                      type="button"
                      onClick={uploadImage}
                      className="items-center rounded-lg w-[150px] font-semibold bg-blue-400 text-white p-2  max-w-[250px]"
                    >
                      Change photo
                    </button>
                  </div>
                </form>
                <form action="">
                  <div className="w-full flex   justify-center  px-10 text-center mt-10  ">
                    <div className="w-full flex flex-col items-start   justify-between  lg:pt-4 pt-8 ">
                      <label htmlFor="" className="font-bold">
                        User Name
                      </label>

                      <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="user name"
                        onChange={(e) => setUserName(e.target.value)}
                        className={`rounded-lg w-full ${
                          themeMode === "dark" ? "bg-black" : "bg-white"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="w-full flex   justify-center  px-10 text-center ">
                    <div className="w-full flex flex-col items-start   justify-between  lg:pt-4 pt-8">
                      <label htmlFor="" className="font-bold">
                        Bio
                      </label>

                      <input
                        type="text"
                        name="username"
                        value={``}
                        placeholder="Bio"
                        onChange={(e) => setUserName(e.target.value)}
                        className={`rounded-lg w-full ${
                          themeMode === "dark" ? "bg-black" : "bg-white"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="w-full flex   justify-center  px-10 text-center ">
                    <div className="w-full flex flex-col items-start   justify-between  lg:pt-4 pt-8">
                      <label htmlFor="" className="font-bold">
                        Gender
                      </label>

                      <select
                        name=""
                        id=""
                        className={`rounded-lg w-full p-2 ${
                          themeMode === "dark" ? "bg-black" : "bg-white"
                        }`}
                      >
                        <option value="">Male</option>
                        <option value="">Female</option>
                        {/* <option value="">Male</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="mt-8 ">
                    <button
                      type="button"
                      onClick={handleusername}
                      className="items-center rounded-lg w-[100px] font-semibold bg-blue-400 text-white p-2  max-w-[100px] "
                    >
                      Change{" "}
                    </button>
                  </div>
                </form>
              </div>
              <div className="text-center ">
                <h3 className="text-xl font-bold italic leading-normal  text-blueGray-700 mb-2"></h3>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center"></div>

                <div className=" grid md:grid-cols-3 grid-cols-1 p-4    mt-10 py-10 border-t border-blueGray-200 text-center"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditUserDetails;
