import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import UserProfile from '../../../components/Profile/UserProfile'
import FriendUSerProfile from '../../../components/Profile/FriendUSerProfile'

const Friend = () => {
  return (
    <div className='h-screen w-full flex'>
      
    <div className='border-l-4 border border-black border-opacity-75 w-1/5 ml-4 my-4   sticky'>
      <Navbar/>
    </div>

   
    <div className='w-4/5   border mr-4 my-4  border-opacity-75 overflow-y-auto scrollbar-hidden'>
     <FriendUSerProfile/>
    </div>
  </div>
  )
}

export default Friend