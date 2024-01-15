import React from "react";
import { IoSearch } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import Button from "../Button";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryValue, setQueryValue } from "../../utilis/handleQueryValue";

function SearchBar({ extraStyle, setIsSearchClicked }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParamsObject = getQueryValue(location);
  return (
    <form
      name="searchBar"
      className={twMerge(
        "flex focus:ring-[3px] focus:ring-yellow-500 ps-1 sm:ps-2  gap-0 items-center flex-grow xl:flex-grow-0 ",
        extraStyle
      )}
    >
      <input
        onChange={(e) => {
          queryParamsObject.productName = e.target.value;
          setQueryValue(queryParamsObject, navigate);
        }}
        onBlur={() => setIsSearchClicked(false)}
        type="text"
        placeholder="Search product..."
        className="xl:w-[700px] w-[calc(100%-50px)]  outline-none ps-3 rounded-s-lg focus:bg-yellow-200/95 h-[60%] box-border"
      />
      <Button
        hover={"orange"}
        extraStyle="w-[50px] p-2 rounded-s-none rounded-e-lg h-[60%]"
      >
        <IoSearch className="size-[30px]  -translate-y-[2px]" />
      </Button>
    </form>
  );
}

export default SearchBar;
