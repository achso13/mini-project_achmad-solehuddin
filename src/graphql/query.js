export const GET_USERS = gql`
  query getUsers {
    users {
      email
      id
      imageurl
      level
      name
      password
    }
  }
`;
