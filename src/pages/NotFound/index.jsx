import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}
