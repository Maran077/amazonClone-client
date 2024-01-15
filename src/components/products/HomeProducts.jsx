import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getQueryValue } from "../../utilis/handleQueryValue";
import { getHomeProducts } from "../../utilis/query/productQuery";

import ProductCard from "../ProductCard";
import LoadingSpinner from "../LoadingSpinner";

function HomeProducts({ setTotalPages }) {
  const location = useLocation();
  const queryParamsObject = getQueryValue(location);

  const { isError, isLoading, data, error, status } = useQuery({
    queryKey: ["searchProducts", queryParamsObject],
    queryFn: () => getHomeProducts(queryParamsObject),
  });

  useEffect(() => {
    if (!data?.success || isError || isLoading) return;
    const { totalPages } = data;
    setTotalPages(totalPages);
  }, [status]);

  if (isLoading) return <LoadingSpinner extraStyle={"size-20"} />;
  if (isError || !data?.success)
    return (
      <h1 className="text-2xl text-red-700">
        {error?.message || data?.message}
      </h1>
    );

  const { products } = data;
  return (
    <>
      <div className="flex flex-wrap gap-5 justify-center">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}

export default HomeProducts;
