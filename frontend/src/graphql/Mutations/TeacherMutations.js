import { gql } from "@apollo/client";

export const ADD_TEACHER = gql`
  mutation AddTeacher($name: String!, $email: String!) {
    addTeacher(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// export const UPDATE_TEACHER = gql`
//   mutation UpdateTeacher($id: ID!, $name: String!, $email: String!) {
//     updateTeacher(id: $id, name: $name, email: $email) {
//       id
//       name
//       email
//     }
//   }
// `;

export const DELETE_TEACHER = gql`
  mutation DeleteTeacher($id: ID!) {
    deleteTeacher(id: $id) {
      id
      name
      email
    }
  }
`;
