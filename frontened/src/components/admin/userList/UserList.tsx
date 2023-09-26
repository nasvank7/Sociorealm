import React,{useEffect,useState} from "react";
import Navbar from "../Navbar/Navbar";
import { adminaxiosInstance } from "../../../services/userApi/axiosInstance";
import { AiTwotoneLock, AiTwotoneUnlock } from "react-icons/ai";
import { toast } from "react-toastify";
import { log } from "console";

const UserList = () => {
  const [users,setUsers]=useState<any>([])
  const [searchUser, setSearchTerm] = useState<any>("");
  useEffect(()=>{
     adminaxiosInstance.get('/user').then((res)=>{
      console.log(res.data);
    

      setUsers(res.data)
      
     })
  },[])

  const handleClick=(user:any)=>{
    adminaxiosInstance.put('/userBlock',user).then((res)=>{
      toast.success(res.data.message);
      setTimeout(()=>{
        window.location.href='/usersList'
      },2000)
    })

  }

  const filteredUser = users.filter((user: any) => {
    console.log("Users:", users);
console.log("Search Term:", searchUser);
    return user.username && user.username.toLowerCase().includes(searchUser.toLowerCase());
  });
  console.log("Filtered Users:", filteredUser); 
  
  
  
  

  return (
    <div className="h-screen w-full flex">
      <div className="border-l-4 border border-black border-opacity-75 w-1/5 ml-4 my-4  rounded-3xl">
        <Navbar />
      </div>

      <div className="w-4/5 bg-gray-100 rounded-3xl border mr-4 my-4 border-black border-opacity-75 ">
        <div className="container mx-auto px-4 ">
          <span className="hidden"></span>
          <button className="bg-black fixed hover:bg-green-600 top-8 text-white font-bold py-2 px-4 rounded-xl ">
            <span className="flex items-center gap-1">
              <span>Refresh</span>
            </span>
          </button>
          <input
            type="text"
            className="border border-gray-300 rounded-md py-2 px-4 top-20 fixed"
            placeholder="Search by username"
            value={searchUser}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="mt-8 overflow-x-auto hide-scrollbar">
            <table className="table-auto w-full mt-20 overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">SI NO</th>
                  <th className="py-2 px-4 border-b">Username</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Phone no</th>
                  <th className="py-2 px-4 border-b">Blocked</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredUser.length>0?(
                    filteredUser.map((user:any ,index:number)=>(
                      <tr key={user._id} className="bg-white text-center">
                      <td className="py-2 px-4 border-b flex justify-center">{index+1}</td>
                      <td className="py-2 px-4 border-b font-semibold">{user.username.toUpperCase()}</td>
                      <td className="py-2 px-4 border-b font-semibold">{user.email}</td>
                      <td className="py-2 px-4 border-b">{user.phone}</td>
                      <td className="py-2 px-4 border-b" onClick={()=>handleClick(user)}>
                        {
                          user.isBlocked===true ?

                          <AiTwotoneUnlock/>
                          :
                          <AiTwotoneLock/>
                        }
                      </td>
                    </tr>
                ))
                  ):(
                    
                    <tr className="bg-white text-center ">
                      <td className="py-2 px-4 border-b flex justify-center"><p>No users data</p></td>
                    </tr>
                  )
                
                
             }
              
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
