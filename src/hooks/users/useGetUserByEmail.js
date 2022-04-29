import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const INSERT_USER_QUERY = gql`
  query MyQuery($email: String = "", $password: String = "email") {
    users(where: { email: { _eq: $email }, password: { _eq: $password } }) {
      id
      email
      imageurl
      level
      name
      password
    }
  }
`;

export default function useGetUserByEmail() {
  const [insertUser, { loading: loadingUser, error: errorUser }] = useMutation(
    INSERT_USER_QUERY,
    {
      onCompleted: () => {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
          icon: "success",
          title: "Register berhasil",
          text: "silahkan login",
        });
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  return {
    insertUser,
    loadingUser,
    errorUser,
  };
}
