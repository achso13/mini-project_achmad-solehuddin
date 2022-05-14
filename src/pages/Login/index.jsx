import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GET_USER_LOGIN } from '../../graphql/query';
import { auth } from '../../utils/helpers';
import Container from '../../components/Container';
import SubmitButton from '../../components/SubmitButton';
import MainLayout from '../../layouts/MainLayout';
import Helmet from 'react-helmet';
import { CONST } from '../../common/constants';

export default function Login() {
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: '',
  });

  const [login, { loading }] = useLazyQuery(GET_USER_LOGIN, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data.users.length === 1) {
        auth.setLogin(data.users[0]);
        Swal.fire({
          title: 'Login berhasil',
          text: 'Selamat datang',
          icon: 'success',
        }).then(() => navigate('/'));
      } else {
        Swal.fire({
          title: 'Login gagal',
          text: 'Email atau password salah',
          icon: 'error',
        });
      }
    },
  });

  const handleOnChange = (e) => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = dataLogin;

    if (email === '' || password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Login gagal',
        text: 'email dan password harus diisi',
      });
    } else {
      const _eq = email;
      const _eq1 = password;
      const variables = { _eq, _eq1 };
      login({ variables });
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>{CONST.title} - Login</title>
      </Helmet>
      <section className="w-full pt-20">
        <Container>
          <div className="my-4 mx-auto w-full rounded-md bg-white py-16 px-8 shadow md:my-20 md:w-96">
            <h1 className="text-center text-3xl font-bold">Login</h1>
            <form className="my-8 flex flex-col gap-5" onSubmit={handleLogin}>
              <input
                name="email"
                type="text"
                placeholder="email"
                value={dataLogin.email}
                onChange={handleOnChange}
                className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                value={dataLogin.password}
                onChange={handleOnChange}
                className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <hr className="my-4" />
              <div className="flex flex-col gap-5 text-center">
                <SubmitButton loading={loading}>Login</SubmitButton>
                <p>
                  Belum punya akun?{' '}
                  <Link to="/register" className="text-red-500 hover:text-red-600">
                    daftar
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
