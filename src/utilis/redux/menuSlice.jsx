import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    changeMenu: (state, action) => {
      return {
        isMenuOpen: action.payload.isOpen,
      };
    },
  },
});

export const { changeMenu } = menuSlice.actions;

export default menuSlice.reducer;
