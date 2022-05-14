import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { CONST } from '../../common/constants';
import Container from '../../components/Container';
import MainLayout from '../../layouts/MainLayout';

export default function NotFound() {
  return (
    <MainLayout>
      <Helmet>
        <title>{CONST.title} - Halaman tidak ditemukan</title>
      </Helmet>
      <Container>
        <div className="mx-auto mt-48 mb-36 text-center">
          <div className="mt-8 mb-12">
            <h1 className="text-7xl font-extrabold text-red-500">404 Not Found</h1>
            <p className="text-xl leading-loose">
              Whoops! It seems the page you're looking for doesn't exist.
            </p>
          </div>

          <Link to="/" className="my-8 rounded-md bg-red-500 py-3 px-4 text-white hover:bg-red-700">
            Back to Home
          </Link>
        </div>
      </Container>
    </MainLayout>
  );
}
