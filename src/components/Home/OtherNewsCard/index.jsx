import React from "react";
import { Link } from "react-router-dom";

import {
  FaRegUser,
  FaRegClock,
  FaRegFolderOpen,
  FaRegEye,
} from "react-icons/fa";

export default function OtherNewsCard({ news }) {
  const {
    title,
    imageurl,
    category,
    id,
    description,
    createdat,
    writer,
    viewcount,
  } = news;

  return (
    <div className="mt-4 mb-16 rounded-lg bg-white">
      <div className="flex flex-col items-center gap-2 ">
        <img
          className="h-60 w-full rounded-lg object-cover "
          src={imageurl}
          alt="thumbnail"
        />

        <div className="w-full py-3 px-8">
          <div className="my-4">
            <Link
              to={"/news/" + id}
              className="text-2xl font-bold hover:text-red-500"
            >
              {title}
            </Link>
            <div className="my-2 flex items-center gap-2 text-gray-600">
              <FaRegFolderOpen />
              <Link
                to={"/kategori/" + category.category}
                className="text-sm hover:text-red-500"
              >
                {category.category}
              </Link>
            </div>
          </div>
          <p>
            {description.slice(0, 50) + (description.length > 50 ? "..." : "")}
          </p>
          <div className="my-3 flex flex-col gap-3 text-gray-600 ">
            <div className="flex items-center gap-2">
              <FaRegClock />
              <span className="text-sm">
                {new Date(createdat).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegUser />
              <span className="text-sm">{writer}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegEye />
              <span className="text-sm">{viewcount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
