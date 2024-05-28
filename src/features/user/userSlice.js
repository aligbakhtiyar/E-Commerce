import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: { username: "ahmad" }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("loginuser");
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


