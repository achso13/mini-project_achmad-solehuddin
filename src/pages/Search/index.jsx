import { useQuery } from '@apollo/client';
import { GET_NEWS_BY_KEYWORD } from '../../graphql/query';
import Container from '../../components/Container';
import Spinner from '../../components/SubmitButton/Spinner';
import NewsList from '../../components/NewsList';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { CONST } from '../../common/constants';
import { Helmet } from 'react-helmet-async';

export default function Search() {
  let [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const { data, loading } = useQuery(GET_NEWS_BY_KEYWORD, {
    variables: {
      _ilike: `%${keyword}%`,
    },
  });

  return (
    <MainLayout>
      <Helmet>
        <title>{CONST.title} - Pencarian</title>
      </Helmet>
      <div className="py-20">
        <Container>
          <div className="my-5 py-5">
            <h1 className="mt-3 text-5xl font-bold">Pencarian</h1>
          </div>
          <div>
            {loading ? (
              <div className="my-8 flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                <div>
                  Ditemukan {data.news.length > 0 ? data.news.length : 0} berita dengan keyword "
                  {keyword}"
                </div>
                <NewsList data={data} />
              </>
            )}
          </div>
        </Container>
      </div>
    </MainLayout>
  );
}
