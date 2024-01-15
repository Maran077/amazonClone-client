import React from "react";
import { Buffer } from "buffer";
import StarRating from "./StarRating";
import ToggleText from "./ToggleText";

function Reviewer({ review }) {
  const { reviewer, reviewerProfilePic, reviewText, reviewTitle, rating } =
    review;
  return (
    <div className="flex flex-col gap-1 mb-3">
      <div className="flex items-center gap-2">
        <img
          className="size-7 rounded-full"
          src={`data:image/jpg;base64,${Buffer.from(
            reviewerProfilePic.data
          ).toString("base64")}`}
          alt=""
        />
        <h1>{reviewer}</h1>
      </div>
      <div className="flex items-center gap-2">
        <StarRating rating={rating} isForReviewerCompent={true} />
        <h3 className="font-bold">{reviewTitle}</h3>
      </div>
      <ToggleText value={reviewText} />
    </div>
  );
}

export default Reviewer;
