import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { GET_LATEST_NEWS } from '../../graphql/query';
import Spinner from '../SubmitButton/Spinner';
import Container from '../Container';
import OtherNewsCard from './OtherNewsCard';

export default function OtherNews() {
  const { data, loading, refetch } = useQuery(GET_LATEST_NEWS, {
    variables: {
      limit: 3,
      offset: 1,
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Container>
      <h1 className="my-5 py-5 text-center text-3xl font-semibold">Berita Terbaru Lainnya</h1>
      {loading ? (
        <div className="my-28 flex w-full items-center justify-center p-12 text-white">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {data.news.map((item) => (
            <OtherNewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </Container>
  );
}
