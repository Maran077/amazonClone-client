import React from "react";
import { twMerge } from "tailwind-merge";

const LoadingSpinner = ({ extraStyle }) => {
  return (
    <div className="flex justify-center items-center ">
      <div
        className={twMerge(
          "spinner-border w-12 h-12 border-4 border-orange-400 rounded-full animate-spin",
          extraStyle
        )}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
