import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";
import menuSlice from "./menuSlice";

export default configureStore({
  reducer: {
    menu: menuSlice,
    modal: modalSlice,
    user: userSlice,
  },
});
