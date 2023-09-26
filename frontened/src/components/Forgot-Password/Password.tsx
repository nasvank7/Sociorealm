import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { toast } from "react-toastify";

const Password = () => {
  
  const nav=useNavigate()
  const {username,newToken}=useParams()
  console.log(username,newToken);
  const [formData, setFormData] = useState({newPassword:''});

  
   useEffect(()=>{
      fetch(`/password-reset/${username}/${newToken}`)
      .then((response)=>response.json())
      .then((data)=>{
        console.log(data);
        
      }).catch((error)=>{
        console.log(error);
        
      })
   },[username,newToken])

   const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();


  


    // Prepare the data to be sent to the backend
    const passwordData = {
      username,
      newToken,
      newPassword: formData.newPassword,
    };


    // Make API call to save the new password
    axiosInstance.post('/password-reset', passwordData).then((response) => {
    const data = response.data;
    console.log(data, "data stored in backend finished");
    toast.success("Password reset successfull")
    setTimeout(()=> {
      nav('/login');
    }, 2000)
  })
  .catch((error) => {
    console.log(error);
  });
  };


   // Handle form input changes
   const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  };
  return (
    <>
    <div className="container h-screen flex items-center justify-center">
      <div className="h-screen md:h-[35rem] w-full px-5 md:px-0 md:w-[20rem] flex ml-60 items-center justify-center">
        <div className="max-w-md w-full bg-white py-10 px-5 shadow-xl rounded-3xl">
          <h2 className="text-4xl text-center font-bold mb-4 font-serif italic">
            Enter New Password
          </h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <input
                type="text"
                name="newPassword"
                id="password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full shadow-xl px-4 py-1 rounded-lg border border-gray-300 italic focus:outline-none focus:border-black"
                placeholder="Enter new Password"
              />
            </div>
  
            <button
              type="submit"
              className="w-full text-white font-bold bg-black rounded-xl h-[2rem] flex justify-center items-center"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  
  );
};

export default Password;
