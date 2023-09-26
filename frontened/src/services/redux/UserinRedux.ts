import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { stat } from "fs";
import RootState from "./Store/rooteState";

export const GetUsernameFromRedux=()=>{
    const userStore=useSelector((state:RootState)=>state?.user)
    let userDetails;
    if(userStore.userCred){
        userDetails=userStore?.userCred
    }
    return userDetails
}