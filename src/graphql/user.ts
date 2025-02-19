import { gql } from "@apollo/client/core";

export const GET_USER = gql`
  query GetUser {
    getUser {
      id
      email
      name
      surname
      credits
      isSocial
      clientId
      clientSecret
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($id: String!, $input: UpdatePasswordDto!) {
    updateUserPassword(id: $id, input: $input)
  }
`;

export const REFRESH_CLIENT_SECRET = gql`
  mutation RefreshUserClientSecret($id: String!) {
    refreshUserClientSecret(id: $id) {
      id
      clientId
      clientSecret
    }
  }
`;
