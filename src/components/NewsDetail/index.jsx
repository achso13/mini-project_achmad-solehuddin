import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { FaRegUser, FaRegClock, FaRegFolderOpen, FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { INCREASE_VIEWCOUNT_MUTATION } from '../../graphql/mutation';
import { dateFormat } from '../../utils/helpers';

export default function NewsDetail({ data }) {
  const { id, title, description, createdat, imageurl, writer, viewcount, category } =
    data.news_by_pk;

  const [increaseViewcount] = useMutation(INCREASE_VIEWCOUNT_MUTATION, {
    variables: {
      id,
      viewcount: viewcount + 1,
    },
  });

  useEffect(() => {
    increaseViewcount();
  }, [increaseViewcount]);

  return (
    <div className="mt-8 mb-12 w-full rounded-lg bg-white p-12 lg:mt-20">
      <h1 className="mb-2 text-3xl font-bold md:text-4xl">{title}</h1>
      <div className="my-2 flex items-center gap-2 text-lg text-gray-600">
        <FaRegFolderOpen />
        <Link to={'/kategori/' + category.category} className=" hover:text-red-500">
          {category.category}
        </Link>
      </div>
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
      <img
        className="my-8 w-full rounded-lg object-cover md:h-[480px]"
        src={imageurl}
        alt="Berita"
      />
      <div>
        <p className="my-4 whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
}
