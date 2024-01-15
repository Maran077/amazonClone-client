import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

const StarRating = ({ reviews, rating, isForReviewerCompent }) => {
  const starsNumber = Math.floor(rating);
  const colorStars = starsNumber <= 5 ? starsNumber : 5;
  const emetyStarts = 5 - colorStars;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(colorStars)]?.map((_, index) => (
          <FaStar key={index} className="size-[20px] text-yellow-500" />
        ))}
        {[...Array(emetyStarts)].map((_, index) => (
          <FaRegStar key={index} className="size-[20px] text-yellow-500" />
        ))}
      </div>
      {!isForReviewerCompent && (
        <span className="text-[#007185] hover:text-red-600 hover:underline translate-y-[1px]">
          {reviews} ratings
        </span>
      )}
    </div>
  );
};

export default StarRating;
