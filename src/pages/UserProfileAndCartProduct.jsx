import React, { useEffect, lazy, Suspense } from "react";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utilis/redux/userSlice";
import { changeMenu } from "../utilis/redux/menuSlice";
import { changeModal } from "../utilis/redux/modalSlice";

import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";

import Cookies from "js-cookie";
import { getFullPriceOfCart } from "../utilis/getFullPriceOfCart";

const ToggleText = lazy(() => import("../components/ToggleText"));
const StarRating = lazy(() => import("../components/StarRating"));
const ProductCard = lazy(() => import("../components/ProductCard"));

function UserProfileAndCardProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLogin, userDetail } = useSelector((state) => state.user);

  const logOut = () => {
    Cookies.remove("token");
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    document.title = "Profile";
    if (!isUserLogin) return navigate("/auth/login");
    dispatch(changeMenu({ isOpen: true }));
  }, []);

  if (!isUserLogin) return null;

  const {
    userName,
    userProfile,
    description,
    role,
    star,
    sellingProucts,
    cartProducts,
  } = userDetail;
  const totalPrice = getFullPriceOfCart(cartProducts);
  return (
    <div className="bg-[#F7F7F7] flex flex-col gap-10 p-3 w-full max-w-[1000px]">
      <div className="flex flex-col bg-white border-[2px] rounded-lg p-4 gap-2">
        <div className="flex items-center gap-2">
          <img
            className="size-7 rounded-full"
            src={`data:image/jpg;base64,${Buffer.from(
              userProfile?.data
            ).toString("base64")}`}
            alt="profile"
          />
          <h1 className="text-2xl font-[600]">{userName}</h1>

          <IoLogOut
            size={30}
            className="hover:text-orange-600"
            onClick={logOut}
          />
        </div>

        <div className="for-buttons flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <p className="font-bold">${totalPrice}</p>
            <Button hover={"yellow"} extraStyle={"max-w-40"}>
              Proceed to buy
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              hover={"orange"}
              text={"black"}
              extraStyle={`max-w-60 ${role !== "seller" && "flex-grow"}`}
              onClick={() =>
                dispatch(
                  changeModal({ isOpen: true, modalType: "editProfile" })
                )
              }
            >
              Edit
            </Button>
            {role === "seller" && (
              <Button
                hover={"orange"}
                text={"black"}
                onClick={() =>
                  dispatch(
                    changeModal({ isOpen: true, modalType: "createProduct" })
                  )
                }
              >
                Create Product
              </Button>
            )}
          </div>
        </div>

        {role === "seller" && (
          <Suspense fallback={<LoadingSpinner extraStyle={"size-7"} />}>
            <>
              <ToggleText value={description} />
              <StarRating rating={star} />
            </>
          </Suspense>
        )}
      </div>

      <div className=" bg-white border-[2px] rounded-lg p-4 w-full ">
        <h1 className="text-2xl font-bold mb-2">Cart</h1>
        <div className="flex overflow-x-auto justify-start gap-5 mb-4">
          {cartProducts.length
            ? cartProducts.map((product) => (
                <Suspense fallback={<LoadingSpinner extraStyle={"size-7"} />}>
                  <ProductCard
                    isUserCardPage={true}
                    product={product}
                    key={product._id}
                  />
                </Suspense>
              ))
            : "Cart Is Empty"}
        </div>
        {sellingProucts.length ? (
          <>
            <h1 className="text-2xl font-bold mb-2">Products</h1>
            <div className="flex overflow-x-auto justify-start gap-5">
              {sellingProucts.map((product) => (
                <Suspense fallback={<LoadingSpinner extraStyle={"size-7"} />}>
                  <ProductCard
                    isUserCardPage={false}
                    product={product}
                    key={product._id}
                  />
                </Suspense>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserProfileAndCardProfile;
