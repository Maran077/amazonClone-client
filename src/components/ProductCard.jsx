import React from "react";
import Button from "./Button";
import StarRating from "./StarRating";
import { Buffer } from "buffer";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updateCartProucts } from "../utilis/query/userQuery";
import { toast } from "react-toastify";
import { setUserProfile } from "../utilis/redux/userSlice";
import { useDispatch } from "react-redux";

function ProductCard({ isUserCardPage, product }) {
  const { productName, price, productImages, _id, star, numberOfReview } =
    product;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: updateCartProucts,
    onSuccess: (res) => {
      if (!res.success) return toast.error(res.message);
      const { cartProducts, msg } = res;
      dispatch(setUserProfile({ cartProducts }));
      toast.success(msg);
    },
    onError: (e) => toast.error(e.message),
  });
  return (
    <div
      className={`${
        isUserCardPage
          ? "h-[700px] w-[400px] min-w-[400px]"
          : "h-[500px] w-[300px] min-w-[300px]"
      } flex flex-col gap-1 border-[2px] rounded-lg`}
    >
      <img
        className="w-full h-[60%] p-3 hover:p-2 object-contain object-center"
        onClick={() => navigate(`/product/${_id}`)}
        src={`data:image/jpg;base64,${Buffer.from(
          productImages[0].data
        ).toString("base64")}`}
      />
      <div className="h-[40%] w-full flex flex-col p-4 gap-1">
        <h1
          className="line-clamp-2 font-[500] text-xl hover:text-red-500 hover:underline"
          onClick={() => navigate(`/product/${_id}`)}
        >
          {productName}
        </h1>
        <StarRating rating={star} reviews={numberOfReview} />
        <p className="text-2xl font-bold first-letter:text-sm">₹{price}</p>
        <Button hover={"yellow"} onClick={() => navigate(`/product/${_id}`)}>
          View Detail
        </Button>
        {isUserCardPage && (
          <>
            <Button hover={"orange"}>Buy Now</Button>
            <Button hover={"orange"} onClick={() => mutate(_id)}>
              Remove Card
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
