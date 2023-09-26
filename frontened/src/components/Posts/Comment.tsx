import React, { useEffect, useRef, useState }  from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { AiOutlineSend } from "react-icons/ai";
import { GetUsernameFromRedux } from '../../services/redux/UserinRedux';
import { axiosInstance } from '../../services/userApi/axiosInstance';
interface CommentProps{
    _id: string;
    userId:{
      id:string;
      username:string
    }
    description: string;
    likes: string;
    image: string;
    
  }
  interface FullPostProps {
    post: CommentProps;
    show: (isVisible: boolean) => void;
  }
const CommentScreen:React.FC<FullPostProps> = ({show,post}) => {

    const userDetails=GetUsernameFromRedux();
        const [comments, setComments] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [load, setLoad] = useState(true);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  
  useEffect(()=>{
     axiosInstance.get(`/getComments/${post._id}`).then((res)=>{
      console.log(res.data.comments);
      setComments(res.data?.comments)
      
     })
  },[post])

    const contentStyles = {
     
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        borderRadius: "1.5rem",
        padding: "1rem",
      };
      const headingStyles = {
        fontSize: "1rem",
        fontWeight: 600,
        marginBottom: "0.1rem",
      };
    
      const inputStyles = {
        width: "100%",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        borderWidth: "1px",
        borderColor: "#d2d6dc",
        borderRadius: "0.375rem",
        outline: "2px solid transparent",
        outlineOffset: "2px",
      };
      const buttonStyles = {
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        borderRadius: "0.375rem",
        outline: "2px solid transparent",
        outlineOffset: "2px",
      };

      const handleSubmit=async(e:any)=>{
      e.preventDefault();
      try {
        const comment=e.target[0].value.trim()
        if(comment?.length > 50){
            throw new Error("upto 50 characters only")
        }
        if(comment?.length < 1){
            throw new Error("Field cant be empty")
        }
        const data={
            postId:post._id,
            userId:userDetails?._id,
            value:comment
        };
        const response=await axiosInstance.post('/postComment',data)
        if (textRef.current) {
            textRef.current.value = "";
          } else {
           
          }
          setComments([...comments,response.data?.comments]);
      } catch (error) {
        
      }

      } 
  return (
    <>
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-10"
      onClick={() => show(false)}
    ></div>

    <div
      style={contentStyles}
      className="w-[22rem] h-[35rem] hide-scrollbar overflow-y-auto bg-black bg-opacity-90 fixed top-[50%] left-[50%] right-[auto] bottom-[auto] -mr-[50%] transform translate-x-[-50%] translate-y-[-50%]  z-20 border-2"
    >
      <span onClick={() => show(false)} className="cursor-pointer">
        <IoArrowBackCircle size={35} />
      </span>
      <img
        src={post.image}
        width={320}
        style={{
          border: "3px solid white",
          borderRadius: "1rem",
          marginTop: "1rem",
         
        }}
        alt=""
      />
      <h2
        style={headingStyles}
        className="text-lg text-center font-semibold font-sans"
      >
        Comments to 's post
      </h2>
      <form className="mb-5" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.1rem" }} className="mb-4">
          <textarea
            id="comment"
            name="comment"
            placeholder="Your Comment"
             ref={textRef}
            style={inputStyles}
           
           
            className="w-full bg-transparent px-4 py-2 h-16 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
          ></textarea>
          <span className="text-red-500">{err}</span>
        </div>
        <div
          style={{ justifyContent: "flex-end" }}
          className="flex justify-end"
        >
          <button
            type="submit"
            style={buttonStyles}
            className="bg-transparent text-white border  rounded-md focus:outline-none"
          >
            <AiOutlineSend size={20} />
          </button>
        </div>
      </form>
     
       { comments?.map((cmt1:any, index:number, array:any) => {
          const cmt = array[array.length - 1 - index];
          return (
            <div className="flex items-center my-2">
              <div className="mr-2">
                <img
                  src={cmt?.userId?.profilePic}
                  style={{ borderRadius: "100%", minWidth: "35px" }}
                  width={35}
                  alt=""
                />
              </div>
              <div className='flex flex-row gap-7'>
                <h1 className="text-white font-bold">{cmt?.userId?.username}</h1>
                <p className="text-sm text-slate-300 font-semibold">{cmt?.comment}</p>
              </div>
            </div>
          );
        })
        }

    </div>
  </>
  )
}

export default CommentScreen
