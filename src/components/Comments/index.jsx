import { useMutation, useSubscription } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DELETE_COMMENTS_MUTATION, INSERT_COMMENTS_MUTATION } from '../../graphql/mutation';
import { GET_COMMENTS_SUBSCRIPTION } from '../../graphql/subscription';
import { auth } from '../../utils/helpers/auth';
import SubmitButton from '../SubmitButton';
import Spinner from '../SubmitButton/Spinner';
import CommentData from './CommentData';

export default function Comments({ data }) {
  const [comment, setComment] = useState('');

  const { id } = data.news_by_pk;

  const { data: dataComments, loading: loadingComments } = useSubscription(
    GET_COMMENTS_SUBSCRIPTION,
    {
      variables: {
        _eq: id,
      },
    }
  );

  const [deleteComment] = useMutation(DELETE_COMMENTS_MUTATION, {
    onCompleted: () => {
      Swal.fire({
        title: 'Success',
        text: 'Komentar berhasil dihapus',
        icon: 'success',
      });
    },
  });

  const [insertComment, { loading: loadingInsert }] = useMutation(INSERT_COMMENTS_MUTATION, {
    onCompleted: () => {
      Swal.fire({
        title: 'Success',
        text: 'Komentar berhasil ditambahkan',
        icon: 'success',
      });
    },
  });

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id_news = id;
    const id_user = auth.getUserId();
    if (!comment) {
      Swal.fire('Oops...', 'Isi dulu komentarmu ...', 'error');
    } else {
      insertComment({
        variables: {
          comment,
          id_news,
          id_user,
        },
      });
      setComment('');
    }
  };

  return (
    <div className="mb-20 w-full rounded-lg bg-white p-12">
      <h3 className="mb-4 text-xl font-bold md:text-3xl">Komentar</h3>

      {loadingComments ? (
        <div className="my-8 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {dataComments.comment.length === 0 ? (
            <div className="my-8 flex items-center justify-center">Belum ada komentar</div>
          ) : (
            <div className="py-2">
              {dataComments.comment.map((item) => (
                <CommentData key={item.id} data={item} deleteComment={deleteComment} />
              ))}
            </div>
          )}
        </>
      )}

      {auth.isAuthenticated() ? (
        <form className="mt-6 flex flex-col gap-4 lg:flex-row" onSubmit={handleSubmit}>
          <input
            name="email"
            type="text"
            placeholder="tulis komentar anda..."
            onChange={handleOnChange}
            value={comment}
            className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <SubmitButton loading={loadingInsert}>Submit</SubmitButton>
        </form>
      ) : (
        <p>
          <Link to="/login" className="font-semibold text-red-500 hover:text-red-700">
            Login
          </Link>{' '}
          untuk bisa berkomentar
        </p>
      )}
    </div>
  );
}
