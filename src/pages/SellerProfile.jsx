import React, { Suspense, lazy, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";

import { useDispatch } from "react-redux";
import { changeMenu } from "../utilis/redux/menuSlice";

import { useQuery } from "@tanstack/react-query";
import { sellerProfile } from "../utilis/query/userQuery";

import ToggleText from "../components/ToggleText";
import StarRating from "../components/StarRating";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductCard = lazy(() => import("../components/ProductCard"));

function SellerProfile() {
  const { sellerName } = useParams();
  const dispatch = useDispatch();
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["seller", sellerName],
    queryFn: () => sellerProfile(sellerName),
  });

  useEffect(() => {
    document.title = "Seller";
    dispatch(changeMenu({ isOpen: true }));
  }, []);

  if (isLoading) return <LoadingSpinner extraStyle={"size-20"} />;
  if (isError || !data?.success)
    return <h1 className="text-red-700">{error?.message || data?.message}</h1>;

  const { seller, products } = data.seller;
  const { description, numberOfReview, star, userName, userProfilePic } =
    seller;
  return (
    <div className="bg-[#F7F7F7] flex flex-col gap-10 p-3 w-full max-w-[1000px]">
      <div className="flex flex-col bg-white border-[2px] rounded-lg p-4 gap-2">
        <div className="flex items-center gap-2">
          <img
            className="size-7 rounded-full"
            src={`data:image/jpg;base64,${Buffer.from(
              userProfilePic?.data
            ).toString("base64")}`}
            alt="profile"
          />
          <h1 className="text-2xl font-[600]">{userName}</h1>
        </div>

        <ToggleText value={description} />
        <StarRating rating={star} reviews={numberOfReview} />
      </div>

      <div className=" bg-white border-[2px] rounded-lg p-4 w-full ">
        <h1 className="text-2xl font-bold mb-2">Products</h1>
        <div className="flex overflow-x-auto justify-start gap-5">
          {products.map((product) => (
            <Suspense fallback={<LoadingSpinner extraStyle={"size-5"} />}>
              <ProductCard
                isUserCardPage={false}
                product={product}
                key={product._id}
              />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;
