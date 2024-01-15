import React from "react";
import { twMerge } from "tailwind-merge";

function Input({ label, extraStyle, ...props }) {
  return (
    <>
      <label htmlFor={props?.id} className="block font-bold mb-[5px] ">
        {label}
      </label>
      <input
        required={true}
        className={twMerge(
          "block ps-3 py-1 w-[100%] outline-none border-[1px] border-gray-700 rounded focus:bg-[#F7FEFF] focus:ring-[3px] focus:ring-cyan-400/40",
          extraStyle
        )}
        {...props}
      />
    </>
  );
}

export default Input;
