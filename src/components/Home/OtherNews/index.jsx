import { useQuery } from "@apollo/client";
import React from "react";
import { GET_LATEST_NEWS } from "../../../graphql/query";
import Container from "../../Container";
import Spinner from "../../SubmitButton/Spinner";
import OtherNewsCard from "../OtherNewsCard";

export default function OtherNews() {
  const { data, loading } = useQuery(GET_LATEST_NEWS, {
    variables: {
      limit: 3,
      offset: 1,
    },
  });

  return (
    <Container>
      <h1 className="my-5 py-5 text-center text-3xl font-semibold">
        Berita Terbaru Lainnya
      </h1>
      {loading ? (
        <div className="my-28 flex w-full items-center justify-center p-12 text-white">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {data.news.map((item) => (
            <OtherNewsCard news={item} />
          ))}
        </div>
      )}
    </Container>
  );
}
