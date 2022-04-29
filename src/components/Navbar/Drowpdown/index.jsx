import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Dropdown() {
  const [dropdownToggle, setDropdownToggle] = useState(false);

  const handleClick = () => {
    setDropdownToggle(!dropdownToggle);
  };
  return (
    <div onMouseLeave={() => handleClick()}>
      <button
        href="#"
        className="flex items-center gap-2"
        onMouseEnter={() => handleClick()}
      >
        <span>Kategori</span> <MdKeyboardArrowDown />
      </button>

      <div
        id="dropdown"
        className={
          dropdownToggle
            ? "absolute z-10 w-40 divide-y divide-gray-100 rounded bg-white shadow"
            : "hidden"
        }
      >
        <ul className="grid-rows-8 grid py-1 text-sm text-gray-500">
          <li>
            <Link
              to="/kategori/nasional"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Nasional
            </Link>
          </li>
          <li>
            <Link
              to="/kategori/internasional"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Internasional
            </Link>
          </li>
          <li>
            <Link
              to="/kategori/olahraga"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Olahraga
            </Link>
          </li>
          <li>
            <Link
              to="/kategori/ekonomi"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Ekonomi
            </Link>
          </li>
          <li>
            <Link
              to="/kategori/hiburan"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Hiburan
            </Link>
          </li>
          <li>
            <Link
              to="/kategori/teknologi"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Teknologi
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
