import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { BiSolidCartAdd } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../utilis/redux/userSlice";

import { useQuery } from "@tanstack/react-query";
import { userProfile } from "../../utilis/query/userQuery";

import SearchBar from "./SearchBar";
import HoverDropMenu from "./HoverDropMenu";
import Button from "../Button";
import Logo from "../Logo";
import Cookies from "js-cookie";

function Menu() {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const { menu, user } = useSelector((state) => state);
  const { isMenuOpen } = menu;
  const { isUserLogin, userDetail } = user;

  const { data, status, isSuccess } = useQuery({
    queryKey: ["user", token],
    queryFn: userProfile,
  });

  useEffect(() => {
    if (isSuccess) {
      if (!data.success) return;
      const { user, cartProducts, sellingProucts } = data.user;
      dispatch(setUserProfile({ ...user, cartProducts, sellingProucts }));
    }
  }, [status]);

  return (
    <>
      {isMenuOpen && (
        <div className="z-50 w-[100dvw] min-w-[350px] h-[70px] bg-slate-600 flex px-3 justify-between sm:justify-center ">
          <div className="flex">
            <Button extraStyle={isSearchClicked ? "hidden" : "h-[100%] "}>
              <Link to={"/"}>
                <Logo />
              </Link>
            </Button>

            <HoverDropMenu
              extraStyle={isSearchClicked ? "hidden" : "-order-1 sm:order-[0]"}
            />
          </div>

          <SearchBar
            setIsSearchClicked={setIsSearchClicked}
            extraStyle={!isSearchClicked ? "hidden sm:flex" : "flex"}
          />

          <div className="flex">
            <Button onClick={() => setIsSearchClicked(true)}>
              <IoSearch
                className={
                  !isSearchClicked ? "size-[35px] sm:hidden" : " hidden"
                }
              />
            </Button>

            <Button
              extraStyle={
                isSearchClicked ? "hidden" : "flex items-center gap-1"
              }
            >
              {isUserLogin ? (
                <Link to={"/profile"} className="text-xl">
                  {userDetail.userName}
                </Link>
              ) : (
                <Link to={"/auth/login"} className="flex items-center">
                  Login
                  <IoLogIn className="size-[30px] sm:size-[40px] " />
                </Link>
              )}
            </Button>

            <Button extraStyle={isSearchClicked ? "hidden" : ""}>
              <Link to={"/profile"}>
                <p className="font-bold text-center">
                  {isUserLogin ? userDetail.cartProducts.length : "0"}
                </p>
                <BiSolidCartAdd className="size-[40px] sm:size-[50px] -translate-y-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
