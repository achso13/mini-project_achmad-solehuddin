import { gql } from '@apollo/client';

export const INSERT_USER_MUTATION = gql`
  mutation insertUser($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
    }
  }
`;

export const INSERT_NEWS_MUTATION = gql`
  mutation insertNews($object: news_insert_input = {}) {
    insert_news_one(object: $object) {
      id
    }
  }
`;

export const UPDATE_NEWS_MUTATION = gql`
  mutation updateNews(
    $id: Int!
    $description: String!
    $id_category: Int!
    $imageurl: String!
    $title: String!
    $writer: String!
  ) {
    update_news_by_pk(
      pk_columns: { id: $id }
      _set: {
        description: $description
        id_category: $id_category
        imageurl: $imageurl
        title: $title
        writer: $writer
      }
    ) {
      id
    }
  }
`;

export const DELETE_NEWS_MUTATION = gql`
  mutation deleteNews($id: Int!) {
    delete_news_by_pk(id: $id) {
      id
    }
  }
`;

export const INCREASE_VIEWCOUNT_MUTATION = gql`
  mutation increaseViewcount($id: Int!, $viewcount: Int!) {
    update_news_by_pk(pk_columns: { id: $id }, _set: { viewcount: $viewcount }) {
      viewcount
    }
  }
`;

export const INSERT_COMMENTS_MUTATION = gql`
  mutation insertComments($comment: String!, $id_news: Int!, $id_user: Int!) {
    insert_comment_one(object: { comment: $comment, id_news: $id_news, id_user: $id_user }) {
      id
    }
  }
`;

export const DELETE_COMMENTS_MUTATION = gql`
  mutation deleteComments($id: Int!) {
    delete_comment_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_PROFILE_PHOTO_MUTATION = gql`
  mutation updateProfilePhoto($id: Int = 10, $imageurl: String = "") {
    update_users_by_pk(pk_columns: { id: $id }, _set: { imageurl: $imageurl }) {
      id
    }
  }
`;
