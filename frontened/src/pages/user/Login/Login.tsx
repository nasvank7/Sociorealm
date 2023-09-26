import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../services/userApi/axiosInstance";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { loginValidationSchema } from "../../../services/validations/userValidations";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = () => {
    console.log("//////////");
    loginValidationSchema
      .validate({ username, password }, { abortEarly: false })
      .then(() => {
        axiosInstance
          .post("/login", { username: username, password: password })
          .then((res) => {
            console.log(res);

            if (res.data.success) {
              localStorage.setItem("jwtToken", JSON.stringify(res.data.token));
              toast.success("Logged in Successfully", { autoClose: 2000 });
              setTimeout(() => {
                window.location.href = "/";
              }, 2000);
            }
            if (res.data.Blocked) {
                toast.error("Account Blocked", { autoClose: 3000 });
              } if (res.data.userNameErr) {
                toast.error("User not found", { autoClose: 3000 });
              }
      
              if (res.data.passErr) {
                toast.error("Invalid password", { autoClose: 3000 });
              }

            
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((validationError) => {
        console.log(validationError, "error");
        const errorMessage = validationError.errors.join("");
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };
  return (
    <GoogleOAuthProvider clientId='206160267923-8o28ar0sr5tbs175dmn0rfgtgvl36419.apps.googleusercontent.com'>
      <>
        <div className="relative">
          <div className="container h-screen flex  items-center justify-center">
            <div
              className="bg-cover w-[25rem] h-[35rem] mt-10 bg-center bg-no-repeat relative p-[1.3rem] hidden md:block"
              style={{ backgroundImage: "url(./images/home-phones-2x.png)" }}
            ></div>
            <div className="h-screen md:h-[35rem] w-full px-5 md:px-0 md:w-[20rem] flex items-center justify-center">
              <div className="max-w-md w-full bg-white py-10 px-5 shadow-xl rounded-3xl">
                <h2 className="text-4xl text-center font-bold mb-4 font-serif italic">
                  sociorealm
                </h2>
                <form>
                  <div className="mb-1">
                    {/* <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-0'>
                        username
                    </label> */}

                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full shadow-xl px-4 py-1 rounded-lg border border-gray-300  italic focus:outline-none focus:border-black"
                      placeholder="username"
                    />
                  </div>

                  <div className="mb-1 mt-5">
                    {/* <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-0'>
                        password
                    </label>
                     */}

                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full shadow-xl px-4 py-1  italic rounded-lg border border-gray-300 focus:outline-none focus:border-black"
                      placeholder="password"
                    />
                  </div>
                  <Link to="/forgot-password">
                    <div className="flex justify-end">
                      <h4>forgot password ?</h4>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full text-white font-bold bg-black rounded-xl h-[2rem] flex justify-center items-center mt-6"
                  >
                    Login
                  </button>

                  <div className="flex justify-center item-center text-center mt-2">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse, "credential");

                        axiosInstance
                          .post("/google/login", credentialResponse)
                          .then((res) => {
                            if (res.data.success) {
                              localStorage.setItem(
                                "jwtToken",
                                JSON.stringify(res.data.token)
                              );
                              toast.success("loggedin Successfully", {
                                autoClose: 2000,
                              });
                              setTimeout(() => {
                                window.location.href = "/";
                              }, 2000);
                            } else if (res.data.message) {
                              toast.error(res.data.message);
                            } else {
                              navigate("/login");
                            }
                          });
                      }}
                    />
                    {/* </FaGoogle> */}
                  </div>
                  <div className="flex justify-center item-center text-center ">
                    <span>OR </span>
                  </div>
                  <div className="flex justify-center text-center ">
                    <p>
                      Don't have an account ?{" "}
                      <Link to={"/signup"}>
                        <span className="text-s   font-bold">
                          Create an Account
                        </span>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </GoogleOAuthProvider>
  );
};

export default Login;
