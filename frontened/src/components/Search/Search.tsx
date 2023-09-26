import React, { useState, useEffect } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { axiosInstance } from "../../services/userApi/axiosInstance";
import { Link } from "react-router-dom";
import { GetUsernameFromRedux } from "../../services/redux/UserinRedux";


interface showProps {
  show: (isVisible: boolean) => void;
}

const Search: React.FC<showProps> = ({ show }) => {
  const userDetails=GetUsernameFromRedux()
  const [searchUser, setSearchUser] = useState<any[]>([]);
  const [searchTerm,setSearchTerm]=useState('')

  useEffect(() => {
    axiosInstance.get('/getAlluser').then((res) => {
      console.log(res.data, "these are data");
      setSearchUser(res.data);
    });
  }, []);

  const filteredUser = searchTerm
    ? searchUser.filter((user) => {
        if (user.username && typeof searchTerm === "string") {
          const matched = user.username
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase());
          return matched;
        }
        return false;
      })
    : [];
  console.log(filteredUser,"these are filtered user");
  

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-10"
        onClick={() => show(false)}
      ></div>
      <div className="container flex flex-col rounded border-zinc-950 w-[22rem] h-[30rem] bg-black bg-opacity-90 fixed top-[50%] left-[50%] right-[auto] bottom-[auto] -mr-[50%] transform translate-x-[-50%] translate-y-[-50%] z-[99] border-2">
        <span onClick={() => show(false)} className="cursor-pointer">
          <IoArrowBackCircle size={35} />
        </span>
         <div>

        <input type="text" value={searchTerm} className="border flex-grow items-center justify-center ml-10 pl-24 mr-10 rounded-2xl border-zinc-950 h-[2rem] mt-10" onChange={(e)=>setSearchTerm(e.target.value)} />
         </div>
   
        
         {filteredUser.map((user) => (
        <div className="border rounded-lg flex  bg-slate-600 mt-5">
          {userDetails?.username===user.username?
           <Link to='/userProfile'>
           <div className=" flex flex-row   " >
                 <img src={user.image} className="rounded-full w-8 h-8" alt="" />
                <p key={user.id} className="text-lg pl-7 items-center justify-center">{user.username}</p>
               
              </div>
           </Link> :
           <Link to={`/user/${user.username}`}>
             <div className=" flex flex-row   " >
                 <img src={user.image} className="rounded-full w-8 h-8" alt="" />
                <p key={user.id} className="text-lg pl-7 items-center justify-center">{user.username}</p>
               
              </div>
           </Link>
          }
        
           
         
        </div>
        
        ))}
        
       
      </div>
    </>
  );
};

export default Search;
