import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RootState from '../../services/redux/Store/rooteState'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../services/userApi/axiosInstance'
import { UserCred, logout, setCredentials } from '../../services/redux/slices/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faSearch,faCompass,faEnvelope,faBell,faPlus,faUser } from '@fortawesome/free-solid-svg-icons'
import { setMode } from '../../services/redux/slices/authSlice'
import Search from '../Search/Search'
import { GetUsernameFromRedux } from '../../services/redux/UserinRedux'
import {IoIosLogOut} from 'react-icons/io'
import { toast } from 'react-toastify'
import Notification from '../Notification/Notification'


const Navbar = () => {
  const userDetails=GetUsernameFromRedux()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const validateToken=()=>{
   axiosInstance.get('/').then((response)=>{
    console.log(response);
    
    if(response.data.success){
      dispatch(setCredentials(response.data.data))
      console.log(    dispatch(setCredentials(response.data.data)),"////////////////");
      
    }else{
      console.log('No user Found');
      
    }
   })
  }

   const user : UserCred | any =useSelector((state:RootState)=>state.user)
   console.log(user,"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");


    const mode = useSelector((state:RootState) => state.user.mode);
    const [showBox,setShowBox]=useState(false)
    const[showNotification,setShowNotification]=useState(false)
   useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      console.log(localStorage.getItem('jwtToken'));
      // console.log();
      

      validateToken();
    }else{
      navigate('/login')
    }
  }, []);
  const handleLogout=()=>{
    localStorage.removeItem('jwtToken');
    dispatch(logout())
    setTimeout(()=>{
      navigate('/login')
    },3000)
    toast.success("logout")
  }

  return  (
    <div className='   h-full w-full border-r-2  flex items-center justify-center'>
      <ul className='h-full flex flex-col justify-beteen p-3 text-sm font-bold xs:text-center max-h-[80%]'>
      <li className="text-7xl flex justify-center sm:flex-none sm:justify-normal mt-3 ">
           
            <span className="sm:flex text-6xl text-dark-400  italic hidden font-qwitcher-grypen ">sociorealm</span>
          </li>
        <Link to='/'>
        <li className="text-3xl flex  justify-center sm:flex-none font-mono sm:justify-normal  mt-4">
          <FontAwesomeIcon icon={faHome} className="lg:hidden xl:hidden" />
           <span className="sm:flex hidden ">HOME</span>
         </li>
        </Link>
         
         <li className="text-3xl flex justify-center sm:flex-none font-mono sm:justify-normal  mt-4">
          {showBox && <Search show={setShowBox} />}
           <FontAwesomeIcon icon={faSearch} className='lg:hidden xl:hidden cursor-pointer'  onClick={()=>setShowBox(true)}/>
           <span className="sm:flex hidden  cursor-pointer" onClick={()=>setShowBox(true)}>SEARCH</span>
         </li>
         <Link to='/explore'>
         <li className="text-3xl flex justify-center sm:flex-none font-mono sm:justify-normal  mt-4">
           <FontAwesomeIcon icon={faCompass} className='lg:hidden xl:hidden'/>
           <span className="sm:flex hidden">EXPLORE</span>
         </li>
         </Link>
         
         <Link to="/chat">
         
         <li className="text-3xl flex justify-center sm:flex-none font-mono sm:justify-normal  mt-4">
           <FontAwesomeIcon icon={faEnvelope} className='lg:hidden xl:hidden cursor-pointer'/>
           <span className="sm:flex hidden cursor-pointer">MESSAGE</span>
         </li>
         </Link>
           
         <li className="text-3xl flex justify-center sm:flex-none font-mono sm:justify-normal  mt-4">
         {showNotification && <Notification show={setShowNotification}/>}
           <FontAwesomeIcon icon={faBell} className='lg:hidden xl:hidden cursor-pointer' onClick={()=>setShowNotification(true)} />
           <span className="sm:flex hidden cursor-pointer" onClick={()=>setShowNotification(true)}>NOTIFICATIONS</span>
         </li>
         <li className="text-3xl flex justify-center sm:flex-none  font-mono sm:justify-normal  mt-4">
         <Link to='/newPost'>
         <FontAwesomeIcon icon={faPlus} className='lg:hidden xl:hidden'/>
           <span className="sm:flex hidden">NEW POST</span>
         </Link>  
         </li>
         <Link to='/userProfile'>
         <li className="text-3xl flex justify-center sm:flex-none font-mono sm:justify-normal  mt-4">
           <FontAwesomeIcon icon={faUser} className='lg:hidden xl:hidden'/>
           <span className="sm:flex hidden">PROFILE</span>
         </li>
         </Link>
         <Link to='/userProfile'>
         <li className="text-sm flex justify-center items-center sm:flex-none font-mono sm:justify-normal  mt-4">
          <img src={userDetails?.image} className='rounded-full w-10 h-10'  alt="" />

           <span className="sm:flex hidden ml-5 text-lg font-qwitcher-grypen">{userDetails?.username}</span>
          
         </li>
         </Link>
         <li className="text-sm flex justify-center items-center sm:flex-none font-mono sm:justify-normal mt-4 ">
         <IoIosLogOut size={30} onClick={handleLogout} className='cursor-pointer'/>
         </li>
        

      </ul>
     
     

    </div>
  )
}

export default Navbar
