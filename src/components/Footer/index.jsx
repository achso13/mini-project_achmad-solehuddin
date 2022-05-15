import React from 'react';
import Container from '../Container';
import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 py-10 text-gray-100">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Connect with us</p>
          <div className="flex gap-5 text-xl">
            <Link className="hover:text-red-500">
              <FaFacebookSquare />
            </Link>
            <Link className="hover:text-red-500">
              <FaInstagram />
            </Link>
            <Link className="hover:text-red-500">
              <FaLinkedin />
            </Link>
          </div>

          <p className="text-center text-sm">
            © 2022 <span className="text-red-500">Berkabar</span>. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
