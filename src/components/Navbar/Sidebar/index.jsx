import { NavLink } from "react-router-dom";
import Container from "../../Container";
import SearchBar from "../SearchBar";

export default function Sidebar(props) {
  const { active } = props;
  return (
    <nav
      className={
        active
          ? "fixed top-16 left-0 z-20 h-screen w-full origin-top scale-y-100 bg-white py-8 transition-all"
          : "fixed top-16 left-0 z-20 h-screen w-full origin-top scale-y-0 bg-white py-8 transition-all"
      }
    >
      <Container>
        <SearchBar />
        <ul>
          <li className="my-5 hover:text-red-500">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="my-5 hover:text-red-500">
            <NavLink to="/kategori/terbaru">Terbaru</NavLink>
          </li>
          <li className="my-5 hover:text-red-500">
            <NavLink to="/kategori/nasional">Nasional</NavLink>
          </li>
          <li className="my-5 hover:text-red-500">
            <NavLink to="/kategori/internasional">Internasional</NavLink>
          </li>
          <li className="my-5 hover:text-red-500">
            <NavLink to="/kategori/olahraga">Olahraga</NavLink>
          </li>
          <li className="my-5 hover:text-red-500">
            <NavLink to="/kategori/ekonomi">Ekonomi</NavLink>
          </li>
          <li className="my-5 hover:text-red-500">
            <NavLink to="/kategori/hiburan">Hiburan</NavLink>
          </li>
          <li className="my-5 hover:text-red-500">
            <NavLink to="/kategori/teknologi">Teknologi</NavLink>
          </li>
        </ul>
      </Container>
    </nav>
  );
}
