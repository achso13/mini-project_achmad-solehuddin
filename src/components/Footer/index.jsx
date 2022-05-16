import React from 'react';
import Container from '../Container';
import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 py-10 text-gray-100">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Connect with us</p>
          <div className="flex gap-5 text-xl">
            <a href="https://www.facebook.com/" className="hover:text-red-500">
              <FaFacebookSquare />
            </a>
            <a href="https://www.instagram.com/" className="hover:text-red-500">
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/achmad-solehuddin-4b145218b/"
              className="hover:text-red-500"
            >
              <FaLinkedin />
            </a>
          </div>

          <p className="text-center text-sm">
            © 2022 <span className="text-red-500">Berkabar</span>. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
