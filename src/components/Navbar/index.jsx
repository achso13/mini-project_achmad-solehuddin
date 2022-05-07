import Container from '../Container';
import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';

import { HiMenuAlt1 } from 'react-icons/hi';
import Sidebar from './Sidebar';
import Dropdown from './Drowpdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../utils/helpers/auth';

export default function Navbar() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white py-4 shadow-sm">
        <Container>
          <div className="flex items-center lg:justify-between">
            <button
              className="flex-grow-0 text-2xl text-gray-700 hover:text-gray-900 lg:hidden"
              onClick={() => handleClick()}
            >
              <HiMenuAlt1 />
            </button>

            <div className="flex flex-grow items-center gap-6">
              <Link
                to="/"
                className="flex-grow text-center text-3xl font-bold text-red-500 lg:flex-grow-0"
              >
                <span className="font-normal">BER</span>
                KABAR
              </Link>
              <ul className="flex-start hidden flex-grow-0 gap-12 lg:flex">
                <li className="my-5 hover:text-red-500">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="my-5 hover:text-red-500">
                  <Dropdown />
                </li>
                {auth.isAdmin() && (
                  <li className="my-5 hover:text-red-500">
                    <NavLink to="/admin/berita">Admin</NavLink>
                  </li>
                )}
              </ul>
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <SearchBar />
              {auth.isAuthenticated() ? (
                <button
                  className="rounded border-2 border-red-500 bg-red-500 py-1 px-2 text-white hover:bg-red-600"
                  onClick={() => auth.logout(navigate)}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="rounded border-2 border-red-500 bg-red-500 py-1 px-2 text-white hover:bg-red-600"
                  >
                    Daftar
                  </Link>
                  <Link
                    to="/login"
                    className="rounded border-2 border-red-500 py-1 px-2 text-red-500 hover:bg-red-600 hover:text-white"
                  >
                    Masuk
                  </Link>
                </>
              )}
            </div>
          </div>
          <Sidebar active={sidebarToggle} />
        </Container>
      </nav>
    </>
  );
}
