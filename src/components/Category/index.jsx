import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_NEWS_BY_CATEGORY } from "../../graphql/query";
import Container from "../Container";
import Footer from "../Footer";
import Navbar from "../Navbar";
import NewsList from "../NewsList";
import Spinner from "../SubmitButton/Spinner";
import Banner from "./Banner";

export default function Category() {
  let params = useParams();
  const { category } = params;

  const { data, loading } = useQuery(GET_NEWS_BY_CATEGORY, {
    variables: {
      _eq: category,
    },
  });

  console.log(data);

  return (
    <>
      <Navbar />
      <Banner category={category} />

      <Container>
        <div>
          {loading ? (
            <div className="my-8 flex items-center justify-center">
              <Spinner />
              <p className="text-lg">Loading ...</p>
            </div>
          ) : (
            <>
              <NewsList data={data} />
            </>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}
