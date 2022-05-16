import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CONST } from '../utils/constants';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <>
      <Helmet>
        <title>{CONST.title}</title>
      </Helmet>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
