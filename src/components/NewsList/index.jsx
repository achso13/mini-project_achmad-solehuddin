import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import NewsCard from "./NewsCard";

export default function NewsList({ data }) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage - itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(data.news.slice(startIndex, endIndex));
  }, [currentPage, data]);

  return (
    <>
      <div className="my-8">
        {paginatedData.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        pageLimit={5}
        dataCount={data.news.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
