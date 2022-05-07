import { gql } from '@apollo/client';

export const GET_USER_LOGIN = gql`
  query getUserLogin($_eq: String!, $_eq1: String!) {
    users(where: { email: { _eq: $_eq }, password: { _eq: $_eq1 } }) {
      id
      level
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUser($id: Int = 10) {
    users_by_pk(id: $id) {
      email
      imageurl
      level
      name
      id
    }
  }
`;

export const GET_NEWS = gql`
  query getNews {
    news(order_by: { createdat: desc }) {
      id
      description
      createdat
      id_category
      imageurl
      title
      updatedat
      writer
      viewcount
      category {
        category
      }
    }
  }
`;

export const GET_NEWS_BY_KEYWORD = gql`
  query getNewsByKeyword($_ilike: String!) {
    news(
      order_by: { createdat: desc }
      where: {
        _or: [
          { title: { _ilike: $_ilike } }
          { writer: { _ilike: $_ilike } }
          { description: { _ilike: $_ilike } }
          { category: { category: { _ilike: $_ilike } } }
        ]
      }
    ) {
      id
      description
      createdat
      id_category
      imageurl
      title
      updatedat
      viewcount
      writer
      category {
        category
      }
    }
  }
`;

export const GET_NEWS_BY_CATEGORY = gql`
  query getNewsByCategory($_eq: String!) {
    news(order_by: { createdat: desc }, where: { category: { category: { _eq: $_eq } } }) {
      id
      description
      createdat
      id_category
      imageurl
      title
      updatedat
      viewcount
      writer
      category {
        category
      }
    }
  }
`;

export const GET_NEWS_BY_ID = gql`
  query getNewsById($id: Int!) {
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

export const GET_LATEST_NEWS = gql`
  query MyQuery($limit: Int!, $offset: Int!) {
    news(limit: $limit, order_by: { createdat: desc }, offset: $offset) {
      id
      createdat
      description
      imageurl
      title
      viewcount
      writer
      category {
        category
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      category
      id
    }
  }
`;

export const GET_COMMENTS = gql`
  query getComments($_eq: Int!) {
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
