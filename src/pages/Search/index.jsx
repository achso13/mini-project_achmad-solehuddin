import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_NEWS_BY_KEYWORD } from '../../graphql/query';
import Container from '../../components/Container';
import Navbar from '../../components/Navbar';
import Spinner from '../../components/SubmitButton/Spinner';
import NewsList from '../../components/NewsList';
import Footer from '../../components/Footer';

export default function Search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const keyword = urlParams.get('keyword');

  const { data, loading } = useQuery(GET_NEWS_BY_KEYWORD, {
    variables: {
      _ilike: `%${keyword}%`,
    },
  });

  useEffect(() => {
    document.title = `Search ${keyword}`;
  }, [keyword]);

  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}
