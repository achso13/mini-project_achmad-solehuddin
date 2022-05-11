import { gql } from '@apollo/client';

export const GET_NEWS_BY_ID_SUBSCRIPTION = gql`
  subscription getNewsById($id: Int!) {
    news_by_pk(id: $id) {
      category {
        category
      }
      createdat
      description
      id
      id_category
      imageurl
      title
      viewcount
      updatedat
      writer
    }
  }
`;

export const GET_COMMENTS_SUBSCRIPTION = gql`
  subscription getComments($_eq: Int!) {
    comment(where: { id_news: { _eq: $_eq } }, order_by: { createdat: desc }) {
      id
      id_user
      comment
      createdat
      user {
        name
        imageurl
      }
    }
  }
`;
