import { useQuery } from "@apollo/client";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { GET_CATEGORIES } from "../../../graphql/query";

export default function Dropdown() {
  const { data, loading } = useQuery(GET_CATEGORIES);
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
          {!loading &&
            data.categories.map((item) => (
              <li key={item.id}>
                <Link
                  to={"/kategori/" + item.category}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {item.category}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
