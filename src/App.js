import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import NewsAdmin from './pages/NewsAdmin';
import Search from './pages/Search';
import Category from './pages/Category';
import News from './pages/News';
import NotFound from './pages/NotFound';
import AdminRoute from './routes/AdminRoute';
import PrivateRoute from './routes/PrivateRoute';
import Profile from './pages/Profile';

function App() {
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

export default App;
