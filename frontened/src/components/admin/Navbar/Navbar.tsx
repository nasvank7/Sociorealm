import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Navigate, useNavigate ,Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faSearch,faCompass,faEnvelope,faBell,faPlus,faUser } from '@fortawesome/free-solid-svg-icons'
import { adminaxiosInstance } from '../../../services/userApi/axiosInstance'


const Navbar = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
 

  
   useEffect(() => {
    const adminToken=localStorage.getItem('adminToken')
      console.log(localStorage.getItem('jwtToken'));
      if(adminToken){
      
   console.log(adminToken,"adminToken here");
   
      
    }else{
      navigate('/admin')
    }
  }, []);
  return  (
    <div className='   h-full w-full border-r-2  flex items-center justify-center'>
      <ul className='h-full flex flex-col justify-beteen p-3 text-sm font-bold xs:text-center max-h-[80%]'>
      <li className="text-7xl flex justify-center sm:flex-none sm:justify-normal mt-5 ">
           
            <span className="sm:flex text-4xl text-dark-400 font-serif italic hidden font-qwitcher-grypen ">sociorealm</span>
          </li>
          <li className="text-3xl flex  justify-center sm:flex-none font-mono sm:justify-normal  mt-11">
          <FontAwesomeIcon icon={faHome} className="lg:hidden xl:hidden" />
           <span className="sm:flex hidden ">DASHBOARD</span>
         </li>
         <li className="text-3xl flex justify-center sm:flex-none font-mono sm:justify-normal  mt-11">
          <Link to='/usersList'>
          <FontAwesomeIcon icon={faUser} className='lg:hidden xl:hidden'/>
           <span className="sm:flex hidden">USERS</span>
          </Link>
         </li>
         <Link to='/postList'>
         <li className="text-3xl flex justify-center sm:flex-none font-mono sm:justify-normal  mt-11">
           <FontAwesomeIcon icon={faPlus} className='lg:hidden xl:hidden'/>
           <span className="sm:flex hidden">POST</span>
         </li>
         </Link>
         <Link to='/report'>
         <li className="text-3xl flex justify-center sm:flex-none font-mono sm:justify-normal  mt-11">
           <FontAwesomeIcon icon={faPlus} className='lg:hidden xl:hidden'/>
           <span className="sm:flex hidden">Report</span>
         </li>
         </Link>
        
         <li className="text-3xl flex justify-center sm:flex-none font-mono sm:justify-normal  mt-11">
           <FontAwesomeIcon icon={faEnvelope} className='lg:hidden xl:hidden'/>
           <span className="sm:flex hidden">ADS</span>
         </li>
         <li className="text-3xl flex justify-center sm:flex-none font-mono sm:justify-normal  mt-11">
           <FontAwesomeIcon icon={faBell} className='lg:hidden xl:hidden' />
           <span className="sm:flex hidden">LOGOUT</span>
         </li>
       

      </ul>
    </div>
  )
}

export default Navbar
