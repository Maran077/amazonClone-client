import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {},
  },
  reducers: {
    setProduct: (state, action) => {
      const { products } = action.payload;
      return {
        ...state,
        products,
      };
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
