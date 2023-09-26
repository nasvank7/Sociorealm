import React,{useState} from 'react'
import { axiosInstance } from '../../services/userApi/axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email,setEmail]=useState<string>("")
    const nav=useNavigate()
    const handleSubmit=()=>{
           axiosInstance.post('/forget-password',{email:email}).then((res)=>{
            toast.success('Email sent Successfully');
          
            console.log(res,"email response");

            
           }).catch((error)=>{
            toast.error("Invalid email")
            console.log(error,"Email error");
            
           })
    }
  return (
    
    <>
    <div className="container h-screen flex  items-center justify-center">
      <div className="h-screen md:h-[35rem] w-full px-5 md:px-0 md:w-[20rem] flex flex-col ml-60 items-center justify-center">
        <div className="max-w-md w-full bg-white py-10 px-5 shadow-xl rounded-3xl">
          <h2 className="text-4xl text-center font-bold mb-4 font-serif italic">
            sociorealm
          </h2>
          <form>
            <div className="mb-1">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full shadow-xl px-4 py-1 rounded-lg border border-gray-300 italic focus:outline-none focus:border-black"
                placeholder="Email"
              />
            </div>
  
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full text-white font-bold bg-black rounded-xl h-[2rem] flex justify-center items-center mt-6"
            >
              SEND EMAIL
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default ForgotPassword
