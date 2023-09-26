import React,{useEffect,useState} from 'react'
import FullPost from '../Posts/FullPost'
import { axiosInstance } from '../../services/userApi/axiosInstance';
import { array } from 'yup';
interface Post {
    _id: string;
    userId:{
      id:string;
      username:string
      image:string
    }
    description: string;
    likes: string;
    image: string;
    saved:string;
    createdAt:string;
     // Assuming "image" is a URL
  }
  
const HomeComponents = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        axiosInstance.get('/getPost').then((res) => {
          console.log(res.data,"helooooooooooo the post is here");
          console.log(res.data.description);
          
          setPosts(res.data.data);
        });
      }, []);
  return (
    <div className="container">
    
    <div className="cards grid grid-col-1 gap-10  justify-center">
      
       {posts?.length!==0 ? posts?.map((post1,index,array)=>{
              const post=array[array?.length-1-index];
              return(
                <div className="w-full  justify-center" >
                <FullPost  postDetails={post}   />
              </div>
              )
       }):
      <p className="flex justify-center items-center h-screen">No posts for you</p>

       }
         
        
    </div>
  </div>
  )
}

export default HomeComponents
