import { useQuery } from '@apollo/client';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GET_CATEGORIES } from '../../../graphql/query';
import { auth } from '../../../utils/helpers/auth';
import Container from '../../Container';
import SearchBar from '../SearchBar';

export default function Sidebar(props) {
  const { active } = props;
  const { data, loading } = useQuery(GET_CATEGORIES);
  const navigate = useNavigate();

  return (
    <nav
      className={
        active
          ? 'fixed top-16 left-0 z-20 h-screen w-full origin-top scale-y-100 bg-white py-8 transition-all lg:hidden'
          : 'fixed top-16 left-0 z-20 h-screen w-full origin-top scale-y-0 bg-white py-8 transition-all lg:hidden'
      }
    >
      <Container>
        <SearchBar />
        <ul>
          <li className="my-5 hover:text-red-500">
            <NavLink to="/">Home</NavLink>
          </li>
          {!loading &&
            data.categories.map((item) => (
              <li className="my-5 hover:text-red-500" key={item.id}>
                <NavLink to={'/kategori/' + item.category}>{item.category}</NavLink>
              </li>
            ))}
          {auth.isAdmin() && (
            <li className="my-5 hover:text-red-500">
              <NavLink to="/admin/berita">Admin</NavLink>
            </li>
          )}
        </ul>
        {auth.isAuthenticated() ? (
          <button
            className="mb-4 w-full rounded border-2 border-red-500 bg-red-500 py-1 px-2 text-center text-white hover:bg-red-600"
            onClick={() => auth.logout(navigate)}
          >
            Logout
          </button>
        ) : (
          <div className="mb-4 flex gap-4">
            <Link
              to="/register"
              className="w-full rounded border-2 border-red-500 bg-red-500 py-1 px-2 text-center text-white hover:bg-red-600"
            >
              Daftar
            </Link>
            <Link
              to="/login"
              className="w-full rounded border-2 border-red-500 py-1 px-2 text-center text-red-500 hover:bg-red-600 hover:text-white"
            >
              Masuk
            </Link>
          </div>
        )}
      </Container>
    </nav>
  );
}
