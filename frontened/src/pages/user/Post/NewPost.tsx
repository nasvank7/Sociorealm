import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import AddPost from '../../../components/Posts/AddPost'

const NewPost = () => {
  return (
    <div className='h-full w-full flex'>

      <div className='lg:border-r-2 lg:border-l-2   border-opacity-75 lg:w-1/5 ml-4 my-4   sticky '>
        <Navbar />
      </div>


      <div className='w-full lg:w-4/5   mr-4 my-4  border-opacity-75 overflow-y-auto scrollbar-hidden'>
        <AddPost />
      </div>
    </div>
  )
}

export default NewPost
