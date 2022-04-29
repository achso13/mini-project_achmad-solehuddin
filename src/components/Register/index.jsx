import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useInsertUser from "../../hooks/users/useInsertUser";
import Container from "../Container";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Register() {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { insertUser, loadingUser } = useInsertUser();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    if (email === "" || password === "" || name === "") {
      Swal.fire({
        title: "Error",
        text: "Email, password, dan nama harus diisi",
        icon: "error",
      });
    } else if (password.length < 6) {
      Swal.fire({
        title: "Error",
        text: "Password minimal 6 karakter",
        icon: "error",
      });
    } else if (password.length > 20) {
      Swal.fire({
        title: "Error",
        text: "Password maksimal 20 karakter",
        icon: "error",
      });
    } else {
      insertUser({ variables: { object: { email, name, password } } });

      setData({ email: "", password: "", name: "" });
    }
  };

  return (
    <>
      <Navbar />
      <section className="w-full pt-20">
        <Container>
          <div className="my-4 mx-auto w-full rounded-md bg-white py-16 px-8 shadow md:my-20 md:w-96">
            <h1 className="text-center text-3xl font-bold">Daftar</h1>

            <form className="my-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="nama"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <hr className="my-4" />
              <div className="flex flex-col gap-5 text-center">
                <button
                  className="flex items-center justify-center gap-2 rounded border-2 border-red-500 bg-red-500 py-1 px-2 text-center text-white hover:bg-red-600 disabled:bg-red-600"
                  disabled={loadingUser}
                >
                  {loadingUser ? (
                    <>
                      <svg
                        role="status"
                        className="mr-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 "
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>{" "}
                      <span>Loading...</span>
                    </>
                  ) : (
                    "Daftar"
                  )}
                </button>
                <p>
                  Sudah punya akun?{" "}
                  <Link to="/login" className="text-red-500 hover:text-red-600">
                    login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}
