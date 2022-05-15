import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Category from '../pages/Category';
import Home from '../pages/Home';
import Login from '../pages/Login';
import News from '../pages/News';
import NewsAdmin from '../pages/NewsAdmin';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Search from '../pages/Search';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news/:id" element={<News />} />
        <Route path="/search" element={<Search />} />
        <Route path="/kategori/:category" element={<Category />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin/berita" element={<NewsAdmin />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
