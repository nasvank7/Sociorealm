import React,{FC, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { adminaxiosInstance } from '../../../services/userApi/axiosInstance'
import { toast } from 'react-toastify'

const AdminLogin:FC = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const navigate=useNavigate()

  const handleSubmit=()=>{
   adminaxiosInstance.post('/admin',{email,password}).then((res)=>{
    if(res.data.err){
      toast.error(res.data.err)
    }else {
      localStorage.setItem('adminToken',JSON.stringify(res.data.token));
      toast.success(res.data.success)
      setTimeout(()=>{
        window.location.href='/adminHome'
      },2000)
    }
   }).catch((err)=>{
    console.log(err);
    
   })
  }
  return (
    <>
  
    <div  className='relative'>
    <div className='container h-screen flex  items-center justify-center'>
     
        <div className='h-screen ml-40 md:h-[35rem] w-full px-6 md:px-0 md:w-[20rem] flex items-center justify-center'>
            <div className='max-w-md w-full bg-white py-10 px-5 shadow-xl rounded-3xl'>
                <h2 className='text-4xl text-center font-bold mb-4 font-serif italic'>
                Admin
                </h2>
                <form >
                <div className='mb-1'>
                    {/* <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-0'>
                        username
                    </label> */}
                    

                    <input type="text" 
                    id='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='w-full shadow-xl px-4 py-1 rounded-lg border border-gray-300  italic text-center focus:outline-none focus:border-black'
                     placeholder='email' />
                    
                </div>
                
               
                <div className='mb-1 mt-5'>
                    {/* <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-0'>
                        password
                    </label>
                     */}

                    <input id='password'
                     type="password"
                     value={password}
                     
                    onChange={(e)=>setPassword(e.target.value)}
                      className='w-full shadow-xl px-4 py-1  italic rounded-lg text-center border border-gray-300 focus:outline-none focus:border-black'
                      placeholder='password' />
                    
                </div>

                <button type='button' onClick={handleSubmit} className='w-full text-white font-bold bg-black rounded-xl h-[2rem] flex justify-center items-center mt-6'>
                 Login
                </button>
               
<div className="flex justify-center item-center text-center mt-2">
   
                    
                
                   

         
</div>

           


                </form>
               

            </div>
        </div>

    </div>
</div>
</>
  )
}

export default AdminLogin
