import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { INSERT_USER_MUTATION } from '../../graphql/mutation';
import Container from '../../components/Container';
import SubmitButton from '../../components/SubmitButton';
import MainLayout from '../../layouts/MainLayout';
import { Helmet } from 'react-helmet-async';
import { CONST } from '../../common/constants';

export default function Register() {
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [insertUser, { loading: loadingUser }] = useMutation(INSERT_USER_MUTATION, {
    onCompleted: () => {
      Swal.fire({
        icon: 'success',
        title: 'Register berhasil',
        text: 'silahkan login',
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Register gagal',
        text: 'email sudah terdaftar',
      });
    },
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    if (email === '' || password === '' || name === '') {
      Swal.fire({
        title: 'Error',
        text: 'Email, password, dan nama harus diisi',
        icon: 'error',
      });
    } else if (password.length < 6) {
      Swal.fire({
        title: 'Error',
        text: 'Password minimal 6 karakter',
        icon: 'error',
      });
    } else if (password.length > 20) {
      Swal.fire({
        title: 'Error',
        text: 'Password maksimal 20 karakter',
        icon: 'error',
      });
    } else {
      insertUser({ variables: { object: { email, name, password } } });

      setData({ email: '', password: '', name: '' });
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>{CONST.title} - Daftar</title>
      </Helmet>
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
                <SubmitButton loading={loadingUser}>Daftar</SubmitButton>
                <p>
                  Sudah punya akun?{' '}
                  <Link to="/login" className="text-red-500 hover:text-red-600">
                    login
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
