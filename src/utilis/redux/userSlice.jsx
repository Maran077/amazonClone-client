import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetail: {},
    isUserLogin: false,
  },
  reducers: {
    setUserProfile: (state, action) => {
      const token = Cookies.get("token");
      if (!token) return { ...state };
      const {
        userName,
        userProfilePic,
        description,
        role,
        cartProducts,
        sellingProucts,
      } = action.payload ?? {};
      return {
        ...state,
        isUserLogin: true,
        userDetail: {
          userName: userName ?? state.userDetail?.userName,
          userProfile: userProfilePic ?? state.userDetail?.userProfile,
          description: description ?? state.userDetail?.description,
          role: role ?? state.userDetail?.role,
          cartProducts: cartProducts ?? state.userDetail?.cartProducts,
          sellingProucts: sellingProucts ?? state.userDetail?.sellingProucts,
        },
      };
    },
    logout: (state) => {
      return {
        ...state,
        isUserLogin: false,
        userDetail: {},
      };
    },
  },
});

export const { setUserProfile, logout } = userSlice.actions;

export default userSlice.reducer;
