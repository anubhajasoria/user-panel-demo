import React from "react";

interface PaginationProps {
  numberOfPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  numberOfPages = 5,
  currentPage = 2,
  setPage,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= numberOfPages) {
      setPage(page);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>

        {Array.from({ length: numberOfPages }, (_, i) => i + 1).map(
          (page, ind) => (
            <li key={ind}>
              <button
                onClick={() => handlePageChange(page)}
                className={`px-4 h-10 border border-slate-300  hover:bg-gray-100 hover:text-gray-700 ${
                  currentPage === page
                    ? "text-indigo-500 bg-indigo-100  hover:!bg-blue-100 hover:!text-indigo-500"
                    : "!text-gray-500"
                }`}
              >
                {page}
              </button>
            </li>
          )
        )}

        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === numberOfPages}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === numberOfPages
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
