import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { getQueryValue, setQueryValue } from "../utilis/handleQueryValue";

const FilterSelector = ({ isSideMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParamsObject = getQueryValue(location);

  const handleCategoryChange = (event) => {
    queryParamsObject.category = event.target.value;
    setQueryValue(queryParamsObject, navigate);
  };

  const handlePriceRangeChange = (event) => {
    const price = event.target.value;
    queryParamsObject.minPrice = price.split(" ")[0];
    const maxPrice = price.split(" ")[1];
    if (maxPrice) queryParamsObject.maxPrice = maxPrice;
    else queryParamsObject.maxPrice = "";
    setQueryValue(queryParamsObject, navigate);
  };

  const handleStarRatingChange = (event) => {
    queryParamsObject.star = event.target.value;
    setQueryValue(queryParamsObject, navigate);
  };

  const headimgStyle = "text-xl font-[600]";
  return (
    <div
      className={`${
        isSideMenu
          ? "flex-col items-start text-start translate-y-6"
          : "items-center"
      } flex gap-4 `}
    >
      {isSideMenu && (
        <>
          <h2 className={headimgStyle}>Select Category: </h2>
          <select
            value={queryParamsObject.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select...</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion and Apparel">Fashion and Apparel</option>
            <option value="Home and Furniture">Home and Furniture</option>
            <option value="Toys and Games">Toys and Games</option>
            <option value="Sports">Sports</option>
            <option value={queryParamsObject.category}>
              {queryParamsObject.category}
            </option>
          </select>
        </>
      )}

      <h2 className={headimgStyle}>Price Range: </h2>
      <select
        value={`${queryParamsObject.minPrice} ${queryParamsObject.maxPrice}`}
        onChange={handlePriceRangeChange}
      >
        <option value="">Select...</option>
        <option value="0 500">$0 - $500</option>
        <option value="501 1000">$501 - $1000</option>
        <option value="1001 2000">$1001 - $2000</option>
        <option value="2001 5000">$2001 - $5000</option>
        <option value="5001 15000">$5001 - $15000</option>
        <option value="15001 30000">$15001 - $30000</option>
        <option value="30001 60000">$30001 - $60000</option>
        <option value="60001 90000">$60001 - $90000</option>
        <option value="900001 ">above $90000</option>
        <option
          value={`${queryParamsObject.minPrice} ${queryParamsObject.maxPrice}`}
        >
          ${queryParamsObject.minPrice} ${queryParamsObject.maxPrice}
        </option>
      </select>

      <h2 className={headimgStyle}>Star Rating: </h2>
      <select
        value={
          queryParamsObject.star > 5
            ? 5
            : queryParamsObject.star < 0
              ? ""
              : queryParamsObject.star
        }
        onChange={handleStarRatingChange}
      >
        <option value="">Select...</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
    </div>
  );
};

export default FilterSelector;
