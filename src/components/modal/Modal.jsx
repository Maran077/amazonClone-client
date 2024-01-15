import React, { lazy, Suspense } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeModal } from "../../utilis/redux/modalSlice";

const CreateProduct = lazy(() => import("./CreateProduct"));
const EditProfile = lazy(() => import("./EditProfile"));
const AddReview = lazy(() => import("./AddReview"));

const Modal = () => {
  const { isModalOpen, modalType } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(changeModal({ isOpen: false }));
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "editProfile":
        return <EditProfile />;
      case "addReview":
        return <AddReview />;
      case "createProduct":
        return <CreateProduct />;
      default:
        return null;
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="z-50 bg-white w-[60%] min-w-[320px] max-w-[600px] p-6 rounded shadow-lg relative">
            <button onClick={closeModal} className="absolute top-0 right-0 m-2">
              <AiOutlineClose className="text-gray-500" />
            </button>
            <Suspense fallback={<div>Loading...</div>}>
              {renderModalContent()}
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
