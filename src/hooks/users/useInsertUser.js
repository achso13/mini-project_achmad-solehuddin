import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const INSERT_USER_QUERY = gql`
  mutation MyMutation($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
    }
  }
`;

export default function useInsertUser() {
  const [insertUser, { loading: loadingUser, error: errorUser }] = useMutation(
    INSERT_USER_QUERY,
    {
      onCompleted: () => {
        Swal.fire({
          icon: "success",
          title: "Register berhasil",
          text: "silahkan login",
        });
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "Register gagal",
          text: "email sudah terdaftar",
        });
      },
    }
  );

  return {
    insertUser,
    loadingUser,
    errorUser,
  };
}
