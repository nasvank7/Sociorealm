import React,{useState} from 'react'
import {MdReportProblem} from 'react-icons/md'
import Modal from './Modal';
interface showProps {
    show: (isVisible: boolean) => void;
  }
const DropdownModal:React.FC<showProps> = ({show}) => {
    const[showbox,setShow]=useState(false)

    const togglemodal=()=>{
        setShow(true)
    }
  return (
    <div  className='flex  items-center justify-items-end inset-0 flex-col border rounded  shadow-lg '>
          {/* <div
    className=""
    onClick={() => show(false)}
  ></div> */}
      <ul className='flex flex-row gap-4 items-center cursor-pointer ' onClick={togglemodal}>
        <MdReportProblem className='text-yellow-400 cursor-pointer'/>
        <li className='font-semibold mr-3  ' >report</li>
     
       
      </ul>
    </div>
  )
}

export default DropdownModal
