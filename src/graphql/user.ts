import { gql } from "@apollo/client/core";

export const GetUserQuery = gql`
  query GetUser {
    getUser {
      id
      email
      name
      surname
      credits
    }
  }
`;
