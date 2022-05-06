import { useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from "../../graphql/query";

export default function useLogin() {
  const { data, loading, error, refetch } = useQuery(GET_USER_LOGIN, {
    skip: true,
    notifyOnNetworkStatusChange: true,
  });

  return {
    data,
    loading,
    error,
    refetch,
  };
}
