import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { INSERT_USER_MUTATION } from "../../graphql/mutation";

export default function useInsertUser() {
  const [insertUser, { loading: loadingUser, error: errorUser }] = useMutation(
    INSERT_USER_MUTATION,
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
