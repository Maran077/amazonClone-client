import React, { useState } from "react";
import { toast } from "react-toastify";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addReview } from "../../utilis/query/reviewQuery";

import { useDispatch, useSelector } from "react-redux";
import { changeModal } from "../../utilis/redux/modalSlice";

import Button from "../Button";
import TextArea from "../input/TextArea";
import SelectionInput from "../input/SelectionInput";
import Input from "../input/Input";
import LoadingSpinner from "../LoadingSpinner";

function AddReview() {
  const stars = [0, 1, 2, 3, 4, 5];
  const { productId } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [reviewDetail, setReviewDetail] = useState({ product: productId });

  useQuery({
    queryKey: ["product", productId],
    enabled: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addReview,
    onSuccess: (res) => {
      if (!res.success) return toast.error(res.message);
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      dispatch(changeModal({ isOpen: false }));
      toast.success(res.msg);
    },
    onError: (e) => toast.error(e.message),
  });

  const submit = () => {
    event.preventDefault();
    mutate({ review: reviewDetail });
  };
  return (
    <form onSubmit={submit} className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold mb-2">Add Review</h1>
      <Input
        label={"Review Title"}
        type="text"
        name="reviewTitle"
        id="reviewTitle"
        placeholder="review title"
        minLength={5}
        maxLength={50}
        onChange={(e) =>
          setReviewDetail({ ...reviewDetail, reviewTitle: e.target.value })
        }
      />
      <SelectionInput
        title={"star"}
        values={stars}
        value={reviewDetail?.rating}
        onChange={(e) =>
          setReviewDetail({ ...reviewDetail, rating: e.target.value })
        }
      />
      <TextArea
        label={"review"}
        type="text"
        name="reviewText"
        id="reviewText"
        placeholder="review"
        minLength={10}
        maxLength={1000}
        onChange={(e) =>
          setReviewDetail({ ...reviewDetail, reviewText: e.target.value })
        }
      />
      <Button hover={"orange"}>
        {isPending ? <LoadingSpinner extraStyle={"size-5"} /> : "Submit"}
      </Button>
    </form>
  );
}

export default AddReview;
