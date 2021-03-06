import React from 'react';
import { FaTrash, FaSearchPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import storage from '../../../firebase';
import { deleteObject, ref } from 'firebase/storage';
import EditModal from '../../EditModal';

export default function TableData({ data, index, deleteNews }) {
  const { title, description, category, writer, imageurl, viewcount, id } = data;

  const handleDelete = (id) => {
    const fileUrl = data.imageurl;
    const fileRef = ref(storage, fileUrl);

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
        deleteNews({
          variables: {
            id,
          },
        }).then(() => {
          deleteObject(fileRef);
        });
      }
    });
  };

  return (
    <tr
      className={
        index % 2 === 0
          ? 'even border-b odd:bg-white even:bg-gray-50'
          : 'odd border-b odd:bg-white even:bg-gray-50'
      }
    >
      <td className="py-4 md:w-2/12 md:px-4">{title}</td>
      <td className="py-4 md:w-4/12 md:px-4">
        {description.slice(0, 100) + (description.length > 100 ? '...' : '')}
      </td>
      <td className="py-4 md:w-1/12 md:px-4">{category.category}</td>
      <td className="py-4 md:w-2/12 md:px-4">{writer}</td>
      <td className="py-4 md:w-1/12 md:px-4">{viewcount}</td>
      <td className="py-4 md:w-2/12 md:px-4">
        <img src={imageurl} className="h-20 w-20 object-cover" alt="thumbnail" />
      </td>
      <td className="w-2/12 px-6 py-4">
        <div className="flex items-center gap-3 text-gray-500">
          <EditModal data={data} />
          <button className="text-md hover:text-red-500" onClick={() => handleDelete(id)}>
            <FaTrash />
          </button>
          <Link to={`/news/${data.id}`} className="text-md hover:text-red-500">
            <FaSearchPlus />
          </Link>
        </div>
      </td>
    </tr>
  );
}
