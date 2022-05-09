import { useQuery } from '@apollo/client';
import React from 'react';
import Container from '../../components/Container';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

import Spinner from '../../components/SubmitButton/Spinner';
import { GET_USER_BY_ID } from '../../graphql/query';
import { auth } from '../../utils/helpers/auth';

import ProfileData from './ProfileData';

export default function Profile() {
  const { data, loading } = useQuery(GET_USER_BY_ID, { variables: { id: auth.getUserId() } });

  return (
    <>
      <Navbar />
      <section className="w-full pt-20">
        <Container>
          <div className="my-4 mx-auto w-full rounded-md bg-white py-12 px-8 shadow md:my-12 md:w-96">
            <h1 className="text-center text-3xl font-bold">Profile</h1>
            {loading ? (
              <div className="my-8 flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <ProfileData data={data} />
            )}
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}
