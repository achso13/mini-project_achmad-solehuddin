import React, { useRef, useState } from 'react';
import UserAvatar from '../../../assets/img/default-profile.jpg';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import storage from '../../../firebase';
import { UPDATE_PROFILE_PHOTO_MUTATION } from '../../../graphql/mutation';
import SubmitButton from '../../../components/SubmitButton';
import { useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../../../graphql/query';
import { auth } from '../../../utils/helpers';

export default function ProfileData({ data }) {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const { email, name, level, imageurl } = data.users_by_pk;

  const [updatePhoto, { loading }] = useMutation(UPDATE_PROFILE_PHOTO_MUTATION, {
    onCompleted: () => {
      Swal.fire({
        icon: 'success',
        title: 'Update berhasil',
        text: 'Foto profil berhasil diupdate',
      });
    },
    refetchQueries: [{ query: GET_USER_BY_ID, variables: { id: auth.getUserId() } }],
  });

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadData = (file) => {
    const id = auth.getUserId();
    if (!file) {
      return;
    } else {
      const fileName = `${uuidv4()}-${file.name}`;
      const storageRef = ref(storage, `news/${fileName}`);

      const uploadTask = uploadBytes(storageRef, file);

      uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log('uploaded at: ' + downloadURL);

          if (imageurl) {
            const fileRef = ref(storage, imageurl);
            deleteObject(fileRef)
              .then(() => {
                updatePhoto({
                  variables: {
                    id,
                    imageurl: downloadURL,
                  },
                });
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            updatePhoto({
              variables: {
                id,
                imageurl: downloadURL,
              },
            });
          }
        });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allowedExt = ['jpg', 'jpeg', 'png', 'gif'];

    if (!image) {
      Swal.fire('error', 'Harap pilih gambar terlebih dahulu', 'error');
    } else if (image) {
      const imageExt = image['name'].split('.').pop();

      if (!allowedExt.includes(imageExt)) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'File harus berupa gambar dengan ekstensi jpg, png, jpeg, atau gif',
        });
      } else {
        uploadData(image);
        setImage(null);
        imageRef.current.value = '';
      }
    } else {
      uploadData(image);
      setImage(null);
      imageRef.current.value = '';
    }
  };

  return (
    <>
      <img
        src={imageurl ? imageurl : UserAvatar}
        alt="Avatar"
        className="mx-auto my-4 h-32 w-32 rounded-full object-cover"
      />
      <p className="text-center text-gray-500">Akun {level.toUpperCase()}</p>
      <form className="my-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="name" className="font-medium">
          Nama
          <input
            id="name"
            type="text"
            placeholder="nama"
            value={name}
            className="mt-2 w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-300"
            disabled
          />
        </label>

        <label htmlFor="email" className="font-medium">
          Email
          <input
            id="email"
            type="text"
            placeholder="email"
            value={email}
            className="mt-2 w-full rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-300"
            disabled
          />
        </label>

        <hr className="my-4" />
        <label htmlFor="foto" className="font-medium">
          Foto Profile
        </label>
        <input type="file" id="id" ref={imageRef} onChange={handleOnChange} />
        <div className="flex flex-col gap-5 text-center">
          <SubmitButton loading={loading}>Ubah Foto Profile</SubmitButton>
        </div>
      </form>
    </>
  );
}
