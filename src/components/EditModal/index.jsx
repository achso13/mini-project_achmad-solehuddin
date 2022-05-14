import React, { useRef } from 'react';
import { useState } from 'react';
import SubmitButton from '../SubmitButton';
import storage from '../../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_NEWS_MUTATION } from '../../graphql/mutation';
import { GET_CATEGORIES, GET_NEWS } from '../../graphql/query';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { CONST } from '../../common/constants';

export default function EditModal({ data }) {
  const { data: dataCategories, loading: loadingCategories } = useQuery(GET_CATEGORIES);

  const { title, description, id_category, writer, id, imageurl } = data;
  const baseData = {
    id,
    title,
    description,
    category: id_category,
    writer,
  };

  const [modalToggle, setModalToggle] = useState(false);
  const [image, setImage] = useState(null);
  const [editData, setEditData] = useState(baseData);
  const imageRef = useRef();

  const [updateNews, { loading: loadingUpdate }] = useMutation(UPDATE_NEWS_MUTATION, {
    onCompleted: () => {
      Swal.fire({
        icon: 'success',
        title: 'Update berhasil',
        text: 'Data berhasil diupdate',
      });
    },
    refetchQueries: [GET_NEWS],
  });

  const handleClick = () => {
    setModalToggle(!modalToggle);
  };

  const handleOnChange = (e) => {
    const name = e.target.name;

    if (name === 'image') {
      const file = e.target.files[0];
      setImage(file);
    } else {
      const value = e.target.value;
      setEditData({ ...editData, [name]: value });
    }
  };

  const uploadData = (file) => {
    if (!file) {
      updateNews({
        variables: {
          id: id,
          title: editData.title,
          description: editData.description,
          id_category: editData.category,
          writer: editData.writer,
          imageurl,
        },
      });
    } else {
      const fileName = `${uuidv4()}-${file.name}`;
      const storageRef = ref(storage, `news/${fileName}`);

      const uploadTask = uploadBytes(storageRef, file);

      uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const fileUrl = imageurl;
          const fileRef = ref(storage, fileUrl);
          console.log('uploaded at: ' + downloadURL);
          deleteObject(fileRef)
            .then(() => {
              updateNews({
                variables: {
                  id: id,
                  title: editData.title,
                  description: editData.description,
                  id_category: editData.category,
                  writer: editData.writer,
                  imageurl: downloadURL,
                },
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editData.title || !editData.description || !editData.category || !editData.writer) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Harap isi semua field',
      });
    } else if (image) {
      const imageExt = image['name'].split('.').pop();

      if (!CONST.allowedExt.includes(imageExt)) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'File harus berupa gambar dengan ekstensi jpg, png, jpeg, atau gif',
        });
      } else {
        uploadData(image);
        setEditData(baseData);
        setImage(null);
        imageRef.current.value = '';
      }
    } else {
      uploadData(image);
      setEditData(baseData);
      setImage(null);
      imageRef.current.value = '';
    }
  };

  const handleReset = () => {
    setEditData(baseData);
    setImage(null);
    imageRef.current.value = '';
  };

  return (
    <>
      <button className="text-md hover:text-red-500" onClick={() => handleClick()}>
        <FaEdit />
      </button>

      {modalToggle && (
        <>
          <div
            className="fixed top-0 left-0 h-screen w-screen bg-black/50"
            onClick={() => handleClick()}
          ></div>

          <div className="fixed left-1/2 top-0 bottom-0 w-full -translate-x-1/2 overflow-y-scroll rounded-md bg-white px-8 pt-16 pb-8 shadow md:w-1/2">
            <div className="flex items-center justify-between">
              <h1 className="text-center text-3xl font-bold">Edit Berita</h1>
              <button className="text-3xl hover:text-red-500" onClick={() => handleClick()}>
                <AiOutlineClose className="hover:text-red-500" />
              </button>
            </div>
            <form className="my-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium">
                  Judul<span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={editData.title}
                  onChange={handleOnChange}
                  placeholder="Judul Berita"
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="writer" className="mb-2 block text-sm font-medium">
                  Penulis<span className="text-red-500">*</span>
                </label>
                <input
                  id="writer"
                  name="writer"
                  type="text"
                  defaultValue={editData.writer}
                  onChange={handleOnChange}
                  placeholder="Nama Penulis"
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-medium">
                  Deskripsi<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Deskripsi"
                  rows={5}
                  defaultValue={editData.description}
                  onChange={handleOnChange}
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>
              <div>
                <label htmlFor="categories" className="mb-2 block text-sm font-medium">
                  Kategori<span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  defaultValue={editData.category}
                  onChange={handleOnChange}
                >
                  <option value="">Pilih Kategori</option>
                  {!loadingCategories &&
                    dataCategories?.categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.category}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="image">
                  Upload foto<span className="text-red-500">*</span>
                </label>
                <img className="my-4 w-40" src={imageurl} alt="berita" />
                <input
                  id="image"
                  type="file"
                  name="image"
                  onChange={handleOnChange}
                  ref={imageRef}
                />
                <label className="mb-2 block text-sm font-medium text-red-500" htmlFor="image">
                  Hanya bisa mengupload foto dengan ekstensi jpg, jpeg, gif dan png
                </label>
              </div>

              <hr className="my-4" />
              <div className="flex justify-end gap-8 text-center">
                <button type="reset" className="hover:text-red-500" onClick={() => handleReset()}>
                  Reset
                </button>
                <SubmitButton loading={loadingUpdate}>Submit</SubmitButton>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
