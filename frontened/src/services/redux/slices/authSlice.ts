import { action } from "@material-tailwind/react/types/components/alert";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { stat } from "fs";
// import { userInfo } from "os";

export interface UserCred {
  _id:string;
  username: string;
  email: string;
  image:string;
}

export interface UserState {
  userCred: UserCred | null;
  mode:any
}

const initialState: UserState = {
  userCred: null,
  mode:"light"
};

const authSlice = createSlice({
  name: "userCred",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserCred | null>) => {
      state.userCred = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setMode:(state,action)=>{
      state.mode = action.payload;
    },
    logout: (state) => {
      state.userCred = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout,setMode } = authSlice.actions;

export default authSlice.reducer;
