import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../utils/helpers';

import UserAvatar from '../../../assets/img/default-profile.jpg';

export default function Avatar({ data }) {
  const { imageurl } = data.users_by_pk;
  const navigate = useNavigate();
  const [dropdownToggle, setDropdownToggle] = useState(false);

  const handleClick = () => {
    setDropdownToggle(!dropdownToggle);
  };

  return (
    <div className="relative">
      <img
        src={imageurl ? imageurl : UserAvatar}
        alt="user avatar"
        className="h-10 w-10 cursor-pointer rounded-full object-cover"
        onClick={() => handleClick()}
      />

      <div
        id="dropdown"
        className={
          dropdownToggle ? 'absolute -left-28 z-10 w-40 rounded bg-white drop-shadow-lg' : 'hidden'
        }
      >
        <ul className="grid grid-rows-2 py-1 text-sm text-gray-500">
          <li>
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
              Profile
            </Link>
          </li>
          <li>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => auth.logout(navigate)}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
