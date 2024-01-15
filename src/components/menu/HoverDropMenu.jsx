import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import Button from "../Button";
import SideMenu from "./SideMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryValue, setQueryValue } from "../../utilis/handleQueryValue";

function HoverDropMenu({ extraStyle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [showSideMenu, setShowSideMenu] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const handleHover = (value) => {
    if (innerWidth < 640) return;
    if (!value) {
      const id = setTimeout(() => {
        setIsHovered(value);
      }, 100);
      setTimeoutId(id);
    } else {
      clearTimeout(timeoutId);
      setIsHovered(value);
    }
  };

  const handleCategoryClick = (category) => {
    const queryParamsObject = getQueryValue(location);
    queryParamsObject.category = category;
    setQueryValue(queryParamsObject, navigate);
  };
  return (
    <>
      <SideMenu showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />
      <div
        className={"relative flex h-[100%] " + extraStyle}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <Button extraStyle={"text-[1.3rem]"}>
          {/* big device */}
          <p className="hidden sm:flex items-center gap-1">
            Category
            {isHovered ? (
              <IoMdArrowDropup size={20} className="translate-y-1" />
            ) : (
              <IoMdArrowDropdown size={20} className="translate-y-1" />
            )}
          </p>
          {/* small device */}
          <GiHamburgerMenu
            className="sm:hidden size-[35px]"
            onClick={() => setShowSideMenu(true)}
          />
        </Button>
        {isHovered && (
          <div
            className="absolute z-[1000] top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-md"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
          >
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryClick("Electronics")}
              >
                Electronics
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryClick("Fashion and Apparel")}
              >
                Fashion and Apparel
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryClick("Home and Furniture")}
              >
                Home and Furniture
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryClick("Toys and Games")}
              >
                Toys and Games
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategoryClick("Sports")}
              >
                Sports
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default HoverDropMenu;
