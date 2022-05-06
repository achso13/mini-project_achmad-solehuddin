import React from "react";
import NewsCard from "./NewsCard";

export default function NewsList({ data }) {
  return (
    <div className="my-8">
      {data?.news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}
