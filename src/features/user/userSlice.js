import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const  getUserFromLocalStorage = () =>{
  return JSON.parse(localStorage.getItem('user')) || null
}

const initialState = {
  user: { username: "ahmad" }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
     const user = {...action.payload.user, token:action.payload.jwt}
     state.user = user;
     localStorage.setItem('user', JSON.stringify(user))
    },
    logoutUser: (state, action) => {
      state.user =null;
      localStorage.removeItem('user')
      toast.success('Loggout Successfully')
    },
  },
});

export const {loginUser, logoutUser} = userSlice.actions;
export default userSlice.reducer


