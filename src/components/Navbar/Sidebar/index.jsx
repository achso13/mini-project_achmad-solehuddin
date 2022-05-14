import { useQuery } from '@apollo/client';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GET_CATEGORIES } from '../../../graphql/query';
import { auth } from '../../../utils/helpers';
import Container from '../../Container';
import SearchBar from '../SearchBar';
import UserAvatar from '../../../assets/img/default-profile.jpg';
import { useEffect, useState } from 'react';

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export default function Sidebar({ user, active }) {
  const navigate = useNavigate();
  const [toggleCategory, setToggleCategory] = useState(false);
  const { data, loading } = useQuery(GET_CATEGORIES);

  const handleOnClick = () => {
    setToggleCategory(!toggleCategory);
  };

  useEffect(() => {
    if (active === false) {
      setToggleCategory(false);
    }
  }, [active]);

  return (
    <nav
      className={
        active
          ? 'fixed top-16 left-0 bottom-0 z-20 w-full origin-top scale-y-100 overflow-y-scroll bg-white py-4 transition-all lg:hidden'
          : 'fixed top-16 left-0 bottom-0 z-20 w-full origin-top scale-y-0 overflow-y-scroll bg-white py-4 transition-all lg:hidden'
      }
    >
      <Container>
        {auth.isAuthenticated() && (
          <div className="mb-3 flex flex-row items-center gap-5">
            <img
              src={user.users_by_pk.imageurl ? user.users_by_pk.imageurl : UserAvatar}
              alt="user avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="font-semibold">{user.users_by_pk.name}</p>
          </div>
        )}

        <SearchBar />
        <ul>
          <li className="my-5 hover:text-red-500">
            <NavLink to="/">Home</NavLink>
          </li>
          {auth.isAuthenticated() && (
            <li className="my-5 hover:text-red-500">
              <NavLink to="/profile">Profile</NavLink>
            </li>
          )}

          <li className="my-5 hover:text-red-500" onClick={() => handleOnClick()}>
            <div className="flex items-center gap-2">
              <span>Kategori </span>
              {toggleCategory ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
          </li>

          <div className={toggleCategory ? 'mx-4 origin-top scale-y-100 transition-all' : 'hidden'}>
            {!loading &&
              data.categories.map((item) => (
                <li className="my-5 hover:text-red-500" key={item.id}>
                  <NavLink to={'/kategori/' + item.category}>{item.category}</NavLink>
                </li>
              ))}
          </div>

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
