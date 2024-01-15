import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import FilterSelector from "../components/FilterSelector";
import { useDispatch } from "react-redux";
import { changeMenu } from "../utilis/redux/menuSlice";
import HomeProducts from "../components/products/homeProducts";

function Home() {
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    document.title = "Home";
    dispatch(changeMenu({ isOpen: true }));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-5 pt-5">
      <div className="hidden sm:flex">
        <FilterSelector />
      </div>
      <HomeProducts setTotalPages={setTotalPages} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}

export default Home;
