import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../services/redux/Store/rooteState";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import {
  UserCred,
  logout,
  setCredentials,
} from "../../services/redux/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faCompass,
  faEnvelope,
  faBell,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { setMode } from "../../services/redux/slices/authSlice";
import Search from "../Search/Search";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import Notification from "../Notification/Notification";
import { motion } from "framer-motion";
import avatar from "../../../public/images/avatar.jpg";
import ThemeToggle from "../../pages/Theme/ThemeToggle";
const Navbar = () => {
  const userDetails = GetUsernameFromRedux();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateToken = () => {
    axiosInstance.get("/").then((response) => {
      console.log(response);

      if (response.data.success) {
        dispatch(setCredentials(response.data.data));
        console.log(
          dispatch(setCredentials(response.data.data)),
          "////////////////"
        );
      } else {
        console.log("No user Found");
      }
    });
  };

  const user: UserCred | any = useSelector((state: RootState) => state.user);
  console.log(user, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");

  const mode = useSelector((state: RootState) => state.user.mode);
  const [showBox, setShowBox] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      console.log(localStorage.getItem("jwtToken"));
      // console.log();

      validateToken();
    } else {
      navigate("/login");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 3000);
    toast.success("logout");
  };

  return (
    <div className="h-full w-full flex">
      <motion.div
        className={`${showBox || showNotification ? "sm:w-[40%] lg:w-[20%] navbar h-full  flex flex-col items-center justify-center" : "w-[100%] navbar h-full  flex flex-col items-center justify-center" }`}
        
        transition={{ duration: 0.5 }}
      >
        <ul className="h-full flex flex-col justify-evenly sm:items-center lg:items-start ml-2 text-sm font-bold xs:text-center max-h-[80%]">
          <li className="text-7xl flex justify-center sm:justify-normal mt-3">
            <span
              className={` text-6xl text-dark-400 italic font-qwitcher-grypen ${
                showBox || showNotification ? "hidden" : "hidden lg:flex"
              }`}
            >
              sociorealm
            </span>
          </li>
          <Link to="/">
            <li className="text-xl flex flex-row justify-center sm:justify-normal mt-4 gap-x-3">
              <FontAwesomeIcon
                icon={faHome}
                className={`${
                  showBox || showNotification ? "sm:ml-2 lg:ml-7 cursor-pointer" : "cursor-pointer"
                }`}
              />
              <span className={` ${showBox || showNotification ? "hidden" : "hidden lg:block"}`}>
                HOME
              </span>
            </li>
          </Link>
          <li className="text-xl flex flex-row justify-center sm:justify-normal mt-4 gap-x-3">
            <FontAwesomeIcon
              icon={faSearch}
              className={`${
                showBox || showNotification ? "sm:ml-2 lg:ml-7 cursor-pointer" : "cursor-pointer"
              }`}
              onClick={() =>{ setShowBox(true),setShowNotification(false)}}
            />
            <span
              className={` ${
                showBox || showNotification ? "hidden" : "hidden lg:block cursor-pointer"
              }`}
              onClick={() =>{ setShowBox(true),setShowNotification(false)}}
            >
              SEARCH
            </span>
          </li>
          <Link to="/explore">
            <li className="text-xl flex flex-row justify-center sm:justify-normal mt-4 gap-x-3">
              <FontAwesomeIcon
                icon={faCompass}
                className={`${
                  showBox || showNotification ? "sm:ml-2 lg:ml-7 cursor-pointer" : "cursor-pointer"
                }`}
              />
              <span className={` ${showBox || showNotification ? "hidden" : "hidden lg:block"}`}>
                EXPLORE
              </span>
            </li>
          </Link>
          <Link to="/chat">
            <li className="text-xl flex flex-row justify-center sm:justify-normal mt-4 gap-x-3">
              <FontAwesomeIcon
                icon={faEnvelope}
                className={`${
                  showBox || showNotification ? "sm:ml-2 lg:ml-7 cursor-pointer" : "cursor-pointer"
                }`}
              />
              <span
                className={` ${
                  showBox || showNotification ? "hidden" : "hidden lg:block cursor-pointer"
                }`}
              >
                MESSAGE
              </span>
            </li>
          </Link>
          <li className="text-xl flex flex-row justify-center sm:justify-normal mt-4 gap-x-3">
            <FontAwesomeIcon
              icon={faBell}
              className={`${
                showBox || showNotification ? "sm:ml-2 lg:ml-7 cursor-pointer" : "cursor-pointer"
              }`}
              onClick={() =>{ setShowNotification(true),setShowBox(false)}}
            />
            <span
              className={` ${
                showBox || showNotification ? "hidden" : "hidden lg:block cursor-pointer"
              }`}
              onClick={() =>{ setShowNotification(true),setShowBox(false)}}
            >
              NOTIFICATIONS
            </span>
          </li>
          <Link to="/newPost">
            <li className="text-xl flex flex-row justify-center sm:justify-normal mt-4 gap-x-3">
              <FontAwesomeIcon
                icon={faPlus}
                className={`${
                  showBox || showNotification ? "sm:ml-2 lg:ml-7 cursor-pointer" : "cursor-pointer"
                }`}
              />
              <span className={` ${showBox || showNotification ? "hidden" : "hidden lg:block"}`}>
                NEW POST
              </span>
            </li>
          </Link>
          <Link to="/userProfile">
            <li className="text-xl flex flex-row justify-center sm:justify-normal mt-4 gap-x-3">
              <FontAwesomeIcon
                icon={faUser}
                className={`${
                  showBox || showNotification ? "sm:ml-2 lg:ml-7 cursor-pointer" : "cursor-pointer"
                }`}
              />
              <span className={` ${showBox || showNotification ? "hidden" : "hidden lg:block"}`}>
                PROFILE
              </span>
            </li>
          </Link>
          <Link to="/userProfile">
            <li className="text-sm flex flex-row justify-center items-center sm:justify-normal mt-4 gap-x-3">
              <img
                src={userDetails?.image ? userDetails.image : "/avatar.jpg"}
                className={`${
                  showBox
                    ? "ml-4 rounded-full w-10 h-10 object-contain"
                    : "rounded-full w-10 h-10 object-contain"
                }`}
                alt=""
              />
              <span
                className={` font-qwitcher-grypen ${
                  showBox || showNotification ? " hidden" : "hidden lg:block text-lg "
                }`}
              >
                {userDetails?.username}
              </span>
            </li>
          </Link>
          <li className="text-sm flex flex-row justify-center items-center sm:justify-normal mt-4 gap-x-3">
            <IoIosLogOut
              size={30}
              onClick={handleLogout}
              className={`${
                showBox || showNotification ? "sm:ml-2 lg:ml-7 cursor-pointer" : "cursor-pointer"
              }`}
            />
          </li>
          <li className="text-sm flex flex-row justify-center items-center sm:justify-normal mt-4 gap-x-3">
          <ThemeToggle/>
          </li>
        </ul>
      </motion.div>
      <motion.div
        className="search-container flex-grow "
        initial={{ x: "100%" }}
        animate={{ x: showBox || showNotification ? 0 : "100%" }}
        transition={{ duration: 0.5 }}
      >
        {showBox && <Search show={setShowBox} />}
      </motion.div>

      <motion.div
        className="search-container flex-grow "
        initial={{ x: "100%" }}
        animate={{ x: showBox || showNotification ? 0 : "100%" }}
        transition={{ duration: 0.5 }}
      >
            {showNotification && <Notification show={setShowNotification} />}
      </motion.div>

    </div>
  );
};

export default Navbar;
