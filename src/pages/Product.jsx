import React, { Suspense, lazy, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { changeMenu } from "../utilis/redux/menuSlice";
import { changeModal } from "../utilis/redux/modalSlice";
import { setUserProfile } from "../utilis/redux/userSlice";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "../utilis/query/productQuery";
import { updateCartProucts } from "../utilis/query/userQuery";

import Button from "../components/Button";
import StarRating from "../components/StarRating";
import ToggleText from "../components/ToggleText";
import ImageCarousel from "../components/ImageCarousel ";
import LoadingSpinner from "../components/LoadingSpinner";

const Reviewer = lazy(() => import("../components/Reviewer"));

function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLogin } = useSelector((state) => state.user);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: ({ queryKey }) => getSingleProduct({ id: queryKey[1] }),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateCartProucts,
    onSuccess: (res) => {
      if (!res.success) return toast.error(res.message);
      const { cartProducts, msg } = res;
      dispatch(setUserProfile({ cartProducts }));
      toast.success(msg);
    },
    onError: (e) => toast.error(e.message),
  });

  const openReview = () => {
    if (!isUserLogin) return navigate("/auth/login");
    dispatch(changeModal({ isOpen: true, modalType: "addReview", productId }));
  };

  useEffect(() => {
    document.title = "Product";
    dispatch(changeMenu({ isOpen: true }));
  }, []);

  if (isLoading)
    return <LoadingSpinner extraStyle={"w-[50px] h-[50px] mt-4"} />;
  if (isError || !data?.success)
    if (error?.name == "SyntaxError")
      return <h1 className="text-red-700">Error try again</h1>;
  return <h1 className="text-red-700">{error?.message || data?.message}</h1>;

  const { productData, reviewAndReviewerData } = data.productAndReviewData;
  const {
    productName,
    description,
    productImages,
    price,
    seller,
    star,
    numberOfReview,
  } = productData;

  return (
    <div className="flex flex-col gap-10 items-center max-w-[1200px] bg-[#f7f7f7] p-3">
      <div className="flex flex-col md:flex-row md:items-center md:gap-3 border-[3px] p-3 rounded-lg bg-white">
        <ImageCarousel
          images={productImages}
          divStyle={
            "relative md:sticky md:top-7 h-[320px] w-full max-w-[400px] md:w-[50%] self-center md:self-start "
          }
        />
        <div className=" flex flex-col p-4 gap-2 md:w-[60%] md:self-start">
          <h1 className="font-[500] text-xl">{productName}</h1>
          <p
            onClick={() => navigate(`/seller/${seller}`)}
            className="text-[#007185] hover:text-red-600 hover:underline"
          >
            {seller}
          </p>
          <StarRating rating={star} reviews={numberOfReview} />
          <p className="text-2xl font-bold first-letter:text-sm">₹{price}</p>
          <Button hover={"yellow"}>Buy Now</Button>
          <Button hover={"orange"} onClick={() => mutate(productId)}>
            {isPending ? <LoadingSpinner extraStyle={"size-5"} /> : "Add Cart"}
          </Button>
          <div className="container mt-5">
            <ToggleText heading={true} value={description} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3 border-[3px] rounded-lg bg-white w-full">
        <h1 className="font-[500] text-xl">Review</h1>
        <p
          className="text-[#007185] hover:text-red-600 hover:underline"
          onClick={openReview}
        >
          give review
        </p>
        <div>
          {reviewAndReviewerData.length
            ? reviewAndReviewerData.map((review) => (
                <Suspense fallback={<LoadingSpinner extraStyle={"size-5"} />}>
                  <Reviewer review={review} key={review._id} />
                </Suspense>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Product;
