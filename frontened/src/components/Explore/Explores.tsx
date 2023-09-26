import React,{useEffect,useState }from 'react'
import { axiosInstance } from '../../services/userApi/axiosInstance'
import { Link, useNavigate } from 'react-router-dom';
interface Post {
    _id: string;
    userId:{
      id:string;
      username:string
    }
    description: string;
    likes: string;
    image: string;
    saved:string
     // Assuming "image" is a URL
  }

const Explores = () => {
    const nav=useNavigate()
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        axiosInstance.get('/getPost').then((res) => {
          console.log(res.data,"helooooooooooo the post is here");
          console.log(res.data.description);
          
          setPosts(res.data.data);
        });
      }, []);
  return (
    <div className='grid lg:grid-cols-3  grid-cols-3 p-4 '>
        {
            posts.map((post:any)=>
          
              <div className='card w-full p-2 ' onClick={()=>nav(`/post/${post._id}`)} >
            <img
              src={post.image}
              alt=''
              className='w-full h-full '
            />
          </div>
        
           
            )
        }
      
    </div>
  )
}

export default Explores
