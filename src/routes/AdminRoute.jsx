import React from 'react';
import { Outlet } from 'react-router-dom';
import { auth } from '../utils/helpers';
import NotFound from '../pages/NotFound';

export default function AdminRoute() {
  if (auth.isAuthenticated() && auth.isAdmin()) return <Outlet />;
  return <NotFound />;
}
