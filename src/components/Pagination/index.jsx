import React, { useEffect, useState } from 'react';

export default function Pagination({
  currentPage,
  pageLimit,
  setCurrentPage,
  itemsPerPage,
  dataCount,
}) {
  const pages = Math.ceil(dataCount / itemsPerPage);
  const [paginationGroup, setPaginationGroup] = useState([]);
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const changePage = (pageNumber) => {
    setCurrentPage(Number(pageNumber));
  };

  useEffect(() => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    const pagination = [];
    for (let i = start + 1; i < start + 6; i++) {
      if (i <= pages) {
        pagination.push(i);
      }
    }
    setPaginationGroup(pagination);
  }, [currentPage, pageLimit, pages]);

  return (
    <ul className="my-4 flex justify-center">
      <li>
        <button
          className="ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-red-500 disabled:bg-gray-100 disabled:text-red-500"
          disabled={currentPage === 1}
          onClick={() => goToPreviousPage()}
        >
          Previous
        </button>
      </li>
      {paginationGroup.map((item) => (
        <li key={item}>
          <button
            className="border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-red-500 disabled:bg-gray-100 disabled:text-red-500"
            disabled={item === currentPage}
            onClick={() => changePage(item)}
          >
            {item}
          </button>
        </li>
      ))}
      <li>
        <button
          className="rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-red-500 disabled:bg-gray-100 disabled:text-red-500"
          disabled={currentPage === pages}
          onClick={() => goToNextPage()}
        >
          Next
        </button>
      </li>
    </ul>
  );
}
