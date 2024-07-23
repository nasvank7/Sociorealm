
import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import Explores from '../../../components/Explore/Explores'

const Explore = () => {
  return (
   
          <div className='h-screen w-full flex'>
      
      <div className=' border-opacity-75 w-1/5 ml-4 my-4   sticky'>
        <Navbar/>
      </div>
  
     
      <div className='w-4/5   mr-4 my-4 border-black border-opacity-75 overflow-y-auto scrollbar-hidden'>
       <Explores/>
      </div>
    </div>
    
  )
}

export default Explore
