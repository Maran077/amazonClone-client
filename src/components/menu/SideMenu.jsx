import React from "react";
import { MdCancel } from "react-icons/md";
import Button from "../Button";
import FilterSelector from "../FilterSelector";

function SideMenu({ showSideMenu, setShowSideMenu }) {
  return (
    <div
      className={`absolute z-30 left-0 top-0 w-[200px] h-[100dvh] p-4 bg-white transition-transform ${
        showSideMenu ? "translate-x-0" : "-translate-x-[200px]"
      }`}
    >
      <Button
        hover={"bgStyle"}
        text={"black"}
        extraStyle={"translate-x-[140px] rounded-full"}
        onClick={() => setShowSideMenu(false)}
      >
        <MdCancel size={24} />
      </Button>
      <h1 className="text-2xl font-bold">Select Filters</h1>

      <FilterSelector isSideMenu={true} />
    </div>
  );
}

export default SideMenu;
