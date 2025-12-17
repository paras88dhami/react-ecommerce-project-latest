import { gql } from "@apollo/client";

export const GET_SEARCH_TEXT = gql`
  query GetSearchText {
    searchText @client
  }
`;