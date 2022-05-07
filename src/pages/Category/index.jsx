import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_NEWS_BY_CATEGORY } from '../../graphql/query';
import Container from '../../components/Container';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import NewsList from '../../components/NewsList';
import Spinner from '../../components/SubmitButton/Spinner';
import CategoryBanner from '../../components/CategoryBanner';

export default function Category() {
  let params = useParams();
  const { category } = params;

  const { data, loading } = useQuery(GET_NEWS_BY_CATEGORY, {
    variables: {
      _eq: category,
    },
  });

  return (
    <>
      <Navbar />
      <CategoryBanner category={category} />

      <Container>
        <div>
          {loading ? (
            <div className="my-36 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <NewsList data={data} />
            </>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}
