import React from 'react';
import { FaRegUser, FaRegClock, FaRegFolderOpen, FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { dateFormat } from '../../../utils/helpers';

export default function NewsCard({ news }) {
  const { id, title, description, createdat, category, writer, imageurl, viewcount } = news;

  return (
    <div className="my-8 rounded-lg bg-white">
      <div className="flex flex-col items-center md:flex-row">
        <div className="h-52 w-full md:w-60">
          <img className=" h-full w-full rounded-lg object-cover" alt="thumbnail" src={imageurl} />
        </div>

        <div className="w-full py-3 px-8">
          <div className="my-4">
            <Link to={'/news/' + id} className="text-2xl font-bold hover:text-red-500">
              {title}
            </Link>
            <div className="my-2 flex items-center gap-2 text-gray-600">
              <FaRegFolderOpen />
              <Link to={'/kategori/' + category.category} className="text-sm hover:text-red-500">
                {category.category}
              </Link>
            </div>
          </div>
          <p>{description.slice(0, 200) + (description.length > 200 ? '...' : '')}</p>
          <div className="my-3 flex flex-col gap-3 text-gray-600 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <FaRegClock />
              <span className="text-sm">{dateFormat(createdat)}</span>
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
