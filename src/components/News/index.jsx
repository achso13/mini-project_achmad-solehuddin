import Container from "../Container";
import Navbar from "../Navbar";

export default function News() {
  return (
    <>
      <Navbar />
      <div className=" w-full bg-red-500 py-20">
        <Container>
          <div className="my-5 py-5">
            <h1 className="my-3 text-5xl font-bold text-gray-100">
              Berita Trending
            </h1>
            <div className="grid grid-cols-3">
              <img src="" alt="" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
