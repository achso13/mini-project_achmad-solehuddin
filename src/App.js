import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import NewsAdmin from "./components/NewsAdmin";
import Search from "./components/Search";
import Category from "./components/Category";
import News from "./components/News";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news/:id" element={<News />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/kategori/:category" element={<Category />} />
        <Route path="/admin/berita" element={<NewsAdmin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
