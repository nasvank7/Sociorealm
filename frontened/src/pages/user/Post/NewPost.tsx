import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import AddPost from '../../../components/Posts/AddPost'

const NewPost = () => {
  return (
    <div className='h-screen w-full flex'>
      
    <div className='border-l-4 border border-black border-opacity-75 w-1/5 ml-4 my-4  '>
      <Navbar />
    </div>

   
    <div className='w-4/5   mr-4 my-4 border-black border-opacity-75 '>
     <AddPost/>
    </div>
  </div>
  )
}

export default NewPost
