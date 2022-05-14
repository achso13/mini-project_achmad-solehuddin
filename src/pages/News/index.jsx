import { useSubscription } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container';
import Spinner from '../../components/SubmitButton/Spinner';
import Comments from '../../components/Comments';
import NewsDetail from '../../components/NewsDetail';
import NotFound from '../NotFound';
import { GET_NEWS_BY_ID_SUBSCRIPTION } from '../../graphql/subscription';
import MainLayout from '../../layouts/MainLayout';
import { CONST } from '../../common/constants';
import Helmet from 'react-helmet';

export default function News() {
  let params = useParams();
  const { id } = params;

  const { data, loading } = useSubscription(GET_NEWS_BY_ID_SUBSCRIPTION, {
    variables: {
      id,
    },
  });

  if (isNaN(id)) {
    return <NotFound />;
  }

  if (loading) {
    return (
      <div className="rounded-lgp-12 my-28 flex w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data.news_by_pk) {
    return <NotFound />;
  }

  return (
    <MainLayout>
      <Helmet>
        <title>
          {data.news_by_pk.title} - {CONST.title}
        </title>
      </Helmet>
      <section className="w-full pt-20">
        <Container>
          <NewsDetail data={data} />
          <Comments data={data} />
        </Container>
      </section>
    </MainLayout>
  );
}
