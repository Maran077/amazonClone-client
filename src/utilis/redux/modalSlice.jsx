import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    modalType: "editProfile",
    productId: null,
    reviewId: null,
  },
  reducers: {
    changeModal: (state, action) => {
      const { isOpen, modalType, productId, reviewId } = action.payload ?? {};
      return {
        ...state,
        isModalOpen: isOpen ?? state.isModalOpen,
        modalType: modalType ?? state.modalType,
        productId: productId ?? state.productId,
        reviewId: reviewId ?? state.reviewId,
      };
    },
  },
});

export const { changeModal } = modalSlice.actions;

export default modalSlice.reducer;
