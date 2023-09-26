import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { adminaxiosInstance } from '../../../services/userApi/axiosInstance'
import {AiFillDelete} from 'react-icons/ai'
import { toast } from 'react-toastify'

const Report = () => {
    const [searchPost,setSearchPost]=useState('')
    const [report,setReport]=useState<any[]>([])
   
   useEffect(()=>{
    adminaxiosInstance.get('/report').then((res)=>{
        setReport(res.data?.reports);
    })
   },[])

    // const handleDelete = async (id: string) => {
    //     await adminaxiosInstance.delete(`/delete/${id}`).then((res) => {
    //       console.log(res);
    //       if (res.data.success) {
            
    //         setReport((prevPost: any) => prevPost.filter((post: any) => post._id !== id));
    //         toast.success("Post deleted successfully");
    //       } else {
    //         toast.error("There is an error in deletion");
    //       }
    //     });
    //   };
  return (
    <div className="h-screen w-full flex">
      <div className="border-l-4 border border-black border-opacity-75 w-1/5 ml-4 my-4  rounded-3xl sticky">
        <Navbar />
      </div>

      <div className="w-4/5 bg-gray-100 rounded-3xl border mr-4 my-4 border-black border-opacity-75 overflow-y-auto">
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
            placeholder="Search Post here"
            value={searchPost}
            onChange={(e) => setSearchPost(e.target.value)}
          />
          <div className="mt-8 overflow-x-auto hide-scrollbar">
            <table className="table-auto w-full mt-20 overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">SI NO</th>
                  <th className="py-2 px-4 border-b">Username</th>
                  <th className="py-2 px-4 border-b">Report</th>
                  <th className="py-2 px-4 border-b">Posts</th>
       
                  {/* <th className="py-2 px-4 border-b"> delete</th> */}
                 
                </tr>
              </thead>
              <tbody>
              {report.map((report: any, index: number) => (
  <tr className="bg-white text-center" key={report._id}>
    <td className="py-2 px-4 border-b items-center">{index + 1}</td>
 <td className="py-2 px-4 border-b font-semibold">{report.reporterId?.username}</td>
    <td className="py-2 px-4 border-b font-semibold">{report.reason}</td>
    <td className="py-2 px-4 border-b font-semibold ">
        <img src={report.postId?.image} className='w-10 h-10 rounded-full' alt="" />
      </td>
  
    {/* <td className="py-2 px-4 border-b"><AiFillDelete onClick={()=>handleDelete(report._id)} className='cursor-pointer'/></td> */}
   
  </tr>
))}
                     
              
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
