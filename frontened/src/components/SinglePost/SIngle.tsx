import React,{useEffect,useState} from 'react'
import { axiosInstance } from '../../services/userApi/axiosInstance'
import { useParams } from 'react-router-dom'
import FullPost from '../Posts/FullPost';
interface Post {
    _id: string;
    userId: {
      id: string;
      username: string;
    };
    description: string;
    likes: string;
    image: string;
    saved: string;
  }
const SIngle = () => {
    const [post,setPosts]=useState<any>([])
    const {postId}=useParams()
    console.log(postId,"this is my postId");
    
    useEffect(()=>{
        axiosInstance.get(`/getPost/${postId}`).then((res)=>{
            console.log(res,"this is the response here");
            setPosts(res.data?.data)
            
        })
    },[postId])
    
    
    console.log({post});
    
  return (
    <>
    <div className='container flex justify-center items-center '>
    <div className='w-[350px] h-[500px]'>
     {post ? (
      <FullPost postDetails={post}/>
    ) : (
      <p>Loading...</p>
    )}
  </div>
    </div>
     
    </>

  )
}

export default SIngle
