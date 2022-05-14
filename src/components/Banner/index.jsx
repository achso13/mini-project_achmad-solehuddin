import { useQuery } from '@apollo/client';
import { GET_LATEST_NEWS } from '../../graphql/query';
import Container from '../Container';
import Spinner from '../SubmitButton/Spinner';

import { FaRegUser, FaRegClock, FaRegFolderOpen, FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { dateFormat } from '../../utils/helpers';

export default function Banner() {
  const { data, loading, refetch } = useQuery(GET_LATEST_NEWS, {
    variables: {
      limit: 1,
      offset: 0,
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className=" w-full bg-red-500 pt-20">
      <Container>
        <div className="my-5 py-5">
          <h1 className="my-3 text-5xl font-bold text-gray-100">Berita Terbaru</h1>
          {loading ? (
            <div className="my-28 flex w-full items-center justify-center p-12 text-white">
              <Spinner />
            </div>
          ) : (
            <div className="my-8 rounded-lg bg-white">
              <div className="flex flex-col items-center gap-2 md:flex-row">
                <img
                  className="h-52 w-full rounded-lg object-cover md:h-72 md:w-1/2"
                  src={data.news[0].imageurl}
                  alt="Berita"
                />

                <div className="w-full py-3 px-8">
                  <div className="my-4">
                    <Link
                      to={'/news/' + data.news[0].id}
                      className="text-3xl font-bold hover:text-red-500"
                    >
                      {data.news[0].title}
                    </Link>
                    <div className="my-2 flex items-center gap-2 text-gray-600">
                      <FaRegFolderOpen />
                      <Link
                        to={'/kategori/' + data.news[0].category.category}
                        className="text-sm hover:text-red-500"
                      >
                        {data.news[0].category.category}
                      </Link>
                    </div>
                  </div>
                  <p>
                    {data.news[0].description.slice(0, 200) +
                      (data.news[0].description.length > 200 ? '...' : '')}
                  </p>
                  <div className="my-3 flex flex-col gap-3 text-gray-600 md:flex-row md:items-center">
                    <div className="flex items-center gap-2">
                      <FaRegClock />
                      <span className="text-sm">{dateFormat(data.news[0].createdat)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRegUser />
                      <span className="text-sm">{data.news[0].writer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRegEye />
                      <span className="text-sm">{data.news[0].viewcount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
