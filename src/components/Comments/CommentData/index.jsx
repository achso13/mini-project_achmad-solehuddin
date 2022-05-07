import React from 'react';
import Swal from 'sweetalert2';
import avatar from '../../../assets/img/default-profile.jpg';
import { auth } from '../../../utils/helpers/auth';
import { dateFormat } from '../../../utils/helpers/dateFormat';

export default function CommentData({ data, deleteComment }) {
  const { id, user, comment, createdat, id_user } = data;

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: 'Proses ini tidak dapat dibatalkan',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment({
          variables: {
            id,
          },
        });
      }
    });
  };

  return (
    <div className="mt-4">
      <div className="flex items-start gap-4">
        <img
          src={user['imageurl'] ? user['imageurl'] : avatar}
          alt="avatar"
          className="w-12 rounded-full"
        />

        <div>
          <p className="text-lg font-medium">{user['name']}</p>
          <p className="my-2 text-base">{comment}</p>
          <div className="text-sm font-normal text-gray-600">
            <p>{dateFormat(createdat)}</p>
            {id_user === Number(auth.getUserId()) && (
              <button className="hover:text-red-500" onClick={() => handleDelete(id)}>
                Hapus Komentar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
