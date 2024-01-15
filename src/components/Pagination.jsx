import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryValue, setQueryValue } from "../utilis/handleQueryValue";

const Pagination = ({ totalPages }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParamsObject = getQueryValue(location);
  const currentPage = parseInt(queryParamsObject.page);

  useEffect(() => {
    queryParamsObject.page = 1;
    setQueryValue(queryParamsObject, navigate);
  }, []);

  const onPageChange = (page) => {
    queryParamsObject.page = page;
    setQueryValue(queryParamsObject, navigate);
  };
  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 2; // Show first 2 and last pages
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPages) {
      if (currentPage <= maxPages) {
        endPage = maxPages;
      } else if (currentPage >= totalPages - maxPages + 1) {
        startPage = totalPages - maxPages + 1;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }

    if (totalPages - currentPage <= 2) {
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="flex justify-center text-[1.2rem] font-[600] my-4 py-2 border-[1px] rounded-md shadow">
      <ul className="flex space-x-2">
        <li>
          <button
            className={`px-3 py-1  text-black ${
              currentPage === 1
                ? " cursor-not-allowed text-gray-500"
                : " hover:text-orange-500"
            }`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {currentPage > 2 && (
          <li>
            <button
              className="px-3 py-1  text-gray-500"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
          </li>
        )}

        {getPageNumbers().map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-1  text-black ${
                currentPage === page
                  ? "border-[2px] border-black"
                  : " hover:text-orange-500"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        {currentPage < totalPages - 2 && (
          <li>
            <button
              className="px-3 py-1  text-gray-500"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        )}
        <li>
          <button
            className={`px-3 py-1 rounded-md text-black ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-500"
                : " hover:text-orange-500"
            }`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
