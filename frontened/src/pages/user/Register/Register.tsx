import { url } from 'inspector'
import React, { FC,useState } from 'react'
import { axiosInstance } from '../../../services/userApi/axiosInstance'
import {toast} from "react-toastify"
import { Link,useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { validationSchema } from '../../../services/validations/userValidations'
import * as Yup from 'yup'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

const Register:FC = () => {

    const [username,setUserName]=  useState<string>('')
    const [email,setEmail]=  useState<string>('')
    const [phone,setPhone]=  useState<string>('')
    const [password,setPassword]=  useState<string>('')
    const [error,setError]=useState<string>('')
    const navigate=useNavigate()
    
    
    

    const handleSubmit=()=>{
        console.log('/////////////////');
        validationSchema.validate({username,email,phone,password},{abortEarly:false}).then(()=>{
            axiosInstance.post('/signpost',{username:username,email:email,phone:phone,password:password}).then((response)=>{
                console.log(response);
                if(response.data.err){
                    const errorMessage=response.data.error
                    setError(errorMessage)
                    toast.error(errorMessage)
    
                }else if(response.data.message){
                    toast.success(response.data.message,{autoClose:3000})
                    setTimeout(()=>{
                        navigate('/login')
                    },2000)
                }
                
            }).catch((error)=>{
                console.log(error,"SignupError");
                
            })
        }).catch((validationError)=>{
                console.log(validationError.errors,"errors");
                const errorMessage=validationError.errors.join('')
                setError(errorMessage);
                toast.error(errorMessage,{position:toast.POSITION.TOP_RIGHT})
                
        })
     
    }
    
  return (
    <GoogleOAuthProvider clientId='206160267923-8o28ar0sr5tbs175dmn0rfgtgvl36419.apps.googleusercontent.com'>
           <>
   

   <div  className='relative'>
       <div className='container h-screen flex  items-center justify-center'>
           <div className='bg-cover w-[25rem] h-[35rem] mt-10 bg-center bg-no-repeat relative p-[1.3rem] hidden md:block' style={{backgroundImage:("url(./images/home-phones-2x.png)")}}>

           </div>
           <div className='h-screen md:h-[35rem] w-full px-5 md:px-0 md:w-[20rem] flex items-center justify-center'>
               <div className='max-w-md w-full bg-white py-10 px-5 shadow-xl rounded-3xl'>
                   <h2 className='text-4xl text-center font-bold mb-4 font-serif italic'>
                   sociorealm
                   </h2>
                   <form >
                   <div className='mb-1'>
                       {/* <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-0'>
                           username
                       </label> */}
                       

                       <input type="text"
                        className='w-full shadow-xl px-4 py-1 rounded-lg border border-gray-300  italic focus:outline-none focus:border-black' 
                       value={username}
                       onChange={(e)=>setUserName(e.target.value)}
                       id='username'
                       name='username'

                       placeholder='username' />
                       
                   </div>
                   <div className='mb-1 mt-5' >
                       {/* <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-0'>
                           email
                       </label> */}
                       

                       <input type="email" 
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}
                         id='email'
                         name='email'
                       className='w-full shadow-xl px-4 py-1 rounded-lg border border-gray-300  italic focus:outline-none focus:border-black'
                       placeholder='email' />
                       
                   </div>
                   <div className='mb-1 mt-5'>
                       {/* <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-0'>
                           phone number
                       </label> */}
                       

                       <input type="tel" 
                         value={phone}
                         onChange={(e)=>setPhone(e.target.value)}
                         id='phone'
                         name='phone'
                       className='w-full shadow-xl px-4 py-1 rounded-lg border  italic border-gray-300 focus:outline-none focus:border-black' 
                       placeholder='phone number' />
                       
                   </div>
                   <div className='mb-1 mt-5'>
                       {/* <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-0'>
                           password
                       </label>
                        */}

                       <input id='password' 
                       type="password"
                       name='password'
                       onChange={(e)=>setPassword(e.target.value)}
                       
                        className='w-full shadow-xl px-4 py-1  italic rounded-lg border border-gray-300 focus:outline-none focus:border-black'
                        placeholder='password' />
                       
                   </div>
                  
                   <button type='button' onClick={handleSubmit} className='w-full text-white font-bold bg-black rounded-xl h-[2rem] flex justify-center items-center mt-6'>
                    Register
                   </button>
                   <div className="flex justify-center item-center text-center mt-2">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse, "credential");

                        axiosInstance
                          .post("/google", credentialResponse)
                          .then((res) => {
                           navigate('/login')
                          })
                          .catch((err)=>{
                            console.log(err,"login error");
                            
                          })
                      }}
                    />
                    {/* </FaGoogle> */}
                  </div>
                   <div className="flex justify-center text-center ">
                       <p>Already have an account ?  <Link to={"/login"}>
                   <span className="text-s   font-bold">Back to Login</span>
                 </Link></p>
                   <Link to={"/login"}>

                 </Link>
</div>
                   </form>
                  

               </div>
           </div>

       </div>
   </div>
 </>
    </GoogleOAuthProvider>
  
  )
}

export default Register
