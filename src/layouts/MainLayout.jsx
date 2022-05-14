import React from 'react';
import Helmet from 'react-helmet';
import { CONST } from '../common/constants';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{CONST.title} - Login</title>
      </Helmet>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
