import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_NEWS_BY_ID } from '../../graphql/query';
import Container from '../../components/Container';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Spinner from '../../components/SubmitButton/Spinner';
import Comments from '../../components/Comments';
import NewsDetail from '../../components/NewsDetail';

export default function News() {
  let params = useParams();
  const { id } = params;

  const { data, loading } = useQuery(GET_NEWS_BY_ID, {
    variables: {
      id,
    },
  });

  return (
    <>
      <Navbar />
      <section className="w-full pt-20">
        <Container>
          <div>
            {loading ? (
              <div className="my-28 flex w-full items-center justify-center rounded-lg bg-white p-12">
                <Spinner />
              </div>
            ) : (
              <>
                <NewsDetail data={data} />
                <Comments data={data} />
              </>
            )}
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}
