import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import RootState from '../../../services/redux/Store/rooteState';
import { useNavigate } from 'react-router-dom';
import { UserCred } from '../../../services/redux/slices/authSlice';
import HomeComponents from '../../../components/Home/HomeComponents';
// import { Redirect } from 'react-router-dom';


const Home = () => {
  // const navigate=useNavigate()
  //  const userCred:UserCred | any=useSelector((state:RootState)=>state.userCred.userCred)
  //  if (!userCred) {
    
  //     navigate('/login')
  //     return null
  // }
  return (

    <div className='h-screen w-full flex relative'>
      
      <div className='border-l-4 border border-black border-opacity-75 w-1/5 ml-4 my-4  rounded-3xl  sticky'>
        <Navbar />
      </div>

     
      <div className='w-4/5 bg-gray-100 rounded-3xl border mr-4 my-4 border-black border-opacity-75 overflow-y-auto scrollbar-hidden'>
      <div className="h-full  ">
          <HomeComponents />
        </div>
      </div>
    </div>
  );
}

export default Home;
