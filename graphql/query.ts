import { gql } from "@apollo/client";

export const GET_USERS = gql`

  query GetUsers($limit: Int!) {
    users(options: { paginate: { page: 1, limit: $limit } }) {
      data {
        id
        name
        username
        email
      }
    }
  }
`;
