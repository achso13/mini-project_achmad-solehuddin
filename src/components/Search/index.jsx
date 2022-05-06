import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_NEWS_BY_KEYWORD } from "../../graphql/query";
import Container from "../Container";
import Navbar from "../Navbar";
import Spinner from "../SubmitButton/Spinner";
import NewsList from "../NewsList";
import Footer from "../Footer";

export default function Search() {
  let params = useParams();
  const { keyword } = params;

  const { data, loading } = useQuery(GET_NEWS_BY_KEYWORD, {
    variables: {
      _ilike: `%${keyword}%`,
    },
  });

  useEffect(() => {
    document.title = `Search ${keyword}`;
    console.log(keyword);
  }, [keyword]);

  return (
    <>
      <Navbar />
      <div className="py-20">
        <Container>
          <div className="my-5 py-5">
            <h1 className="mt-3 text-5xl font-bold">Pencarian</h1>
          </div>
          <div>
            {loading ? (
              <div className="my-8 flex items-center justify-center">
                <Spinner />
                <p className="text-lg">Loading ...</p>
              </div>
            ) : (
              <>
                <div>
                  Ditemukan {data.news.length > 0 ? data.news.length : 0} berita
                  dengan keyword "{keyword}"
                </div>
                <NewsList data={data} />
              </>
            )}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
