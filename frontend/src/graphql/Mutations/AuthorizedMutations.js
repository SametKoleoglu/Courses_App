import { gql } from "@apollo/client";

export const ADD_AUTHORIZED = gql`
  mutation AddAuthorized($email: String!, $password: String!) {
    addAuthorized(email: $email, password: $password) {
      id
      email
      password
      token
    }
  }
`;

export const DELETE_AUTHORIZED = gql`
  mutation DeleteAuthorized($id: ID!) {
    deleteAuthorized(id: $id) {
      id
      email
    }
  }
`;


export const AUTHORIZED_SIGNIN = gql`
  mutation AuthorizedSignin($email: String!, $password: String!) {
    authorizedSignin(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;
