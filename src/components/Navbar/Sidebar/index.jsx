import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { GET_CATEGORIES } from "../../../graphql/query";
import Container from "../../Container";
import SearchBar from "../SearchBar";

export default function Sidebar(props) {
  const { active } = props;
  const { data, loading } = useQuery(GET_CATEGORIES);
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
          {!loading &&
            data.categories.map((item) => (
              <li className="my-5 hover:text-red-500" key={item.id}>
                <NavLink to={"/kategori/" + item.category}>
                  {item.category}
                </NavLink>
              </li>
            ))}
        </ul>
      </Container>
    </nav>
  );
}
