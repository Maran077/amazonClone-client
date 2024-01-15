import React from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonClass = cva(["p-[6px]", "text-center", "bg-transparent"], {
  variants: {
    hover: {
      borderStyle: ["hover:border-[3px]", "hover:border-white"],
      bgStyle: ["hover:bg-gray-300"],
      yellow: ["bg-[#FFD814]", "hover:bg-[#e4c736]", "rounded-lg"],
      orange: ["bg-orange-500", "hover:bg-orange-500/75", "rounded-lg"],
    },
    width: {
      full: ["w-[100%]"],
      medium: ["w-[70%]"],
    },
    text: {
      white: ["text-white"],
      black: ["text-black"],
    },
  },
  defaultVariants: {
    hover: "borderStyle",
    text: "white",
  },
});
function Button({ hover, width, text, extraStyle, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(buttonClass({ hover, width, text }), extraStyle)}
    />
  );
}

export default Button;
