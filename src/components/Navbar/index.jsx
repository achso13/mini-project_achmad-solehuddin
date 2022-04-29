import Container from "../Container";
import SearchBar from "./SearchBar";
import { useState } from "react";

import { HiMenuAlt1 } from "react-icons/hi";
import Sidebar from "./Sidebar";
import Dropdown from "./Drowpdown";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const handleClick = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white py-4">
        <Container>
          <div className="flex items-center md:justify-between">
            <button
              className="flex-grow-0 text-2xl text-gray-700 hover:text-gray-900 md:hidden"
              onClick={() => handleClick()}
            >
              <HiMenuAlt1 />
            </button>

            <div className="flex flex-grow items-center gap-6">
              <Link
                to="/"
                className="flex-grow text-center text-3xl font-bold text-red-500 md:flex-grow-0"
              >
                <span className="font-normal">BER</span>
                KABAR
              </Link>
              <ul className="flex-start hidden flex-grow-0 gap-12 md:flex">
                <li className="my-5 hover:text-red-500">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="my-5 hover:text-red-500">
                  <NavLink to="/latest">Terbaru</NavLink>
                </li>
                <li className="my-5 hover:text-red-500">
                  <Dropdown />
                </li>
              </ul>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <SearchBar />
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
            </div>
          </div>
          <Sidebar active={sidebarToggle} />
        </Container>
      </nav>
    </>
  );
}
