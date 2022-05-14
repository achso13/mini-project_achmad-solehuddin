import React, { useState } from 'react';

import Swal from 'sweetalert2';
import { AiOutlineSearch } from 'react-icons/ai';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_NEWS_MUTATION } from '../../graphql/mutation';
import { GET_CATEGORIES, GET_NEWS, GET_NEWS_BY_KEYWORD } from '../../graphql/query';
import Container from '../../components/Container';
import AddModal from '../../components/AddModal';
import Spinner from '../../components/SubmitButton/Spinner';
import Table from '../../components/Table';
import MainLayout from '../../layouts/MainLayout';
import { CONST } from '../../common/constants';
import Helmet from 'react-helmet';

export default function NewsAdmin() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data: dataNews, loading: loadingNews } = useQuery(GET_NEWS, {
    skip: searchKeyword,
  });
  const { data: dataSearch, loading: loadingSearch } = useQuery(GET_NEWS_BY_KEYWORD, {
    skip: !searchKeyword,
    variables: {
      _ilike: `%${searchKeyword}%`,
    },
  });
  const { data: dataCategories, loading: loadingCategories } = useQuery(GET_CATEGORIES);

  const data = dataSearch || dataNews;
  const loading = loadingSearch || loadingNews;

  const [deleteNews, { loading: loadingDelete }] = useMutation(DELETE_NEWS_MUTATION, {
    onCompleted: () => {
      Swal.fire({
        icon: 'success',
        title: 'Delete berhasil',
        text: 'Data berhasil dihapus',
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Delete gagal',
        text: 'Data gagal dihapus',
      });
    },
    refetchQueries: [GET_NEWS],
  });

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  return (
    <MainLayout>
      <Helmet>
        <title>{CONST.title} - Admin</title>
      </Helmet>
      <section className="my-32 w-full bg-white py-12">
        <Container>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Data Berita</h1>
            {!loadingCategories && <AddModal categories={dataCategories} />}
          </div>

          <div className="mt-8 mb-4 flex justify-between">
            <div className="m-0 flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-gray-50 py-1 px-2 focus:ring-2 focus:ring-red-500">
              <div className="rounded-full text-xl text-gray-700">
                <AiOutlineSearch />
              </div>
              <input
                type="text"
                placeholder="Cari..."
                onChange={handleSearch}
                className="bg-gray-50 focus:outline-none"
              />
            </div>
          </div>
          {loading || loadingDelete ? (
            <div className="my-8 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <Table data={data || []} deleteNews={deleteNews} />
          )}
        </Container>
      </section>
    </MainLayout>
  );
}
