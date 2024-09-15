import { gql } from "@apollo/client";

export const ADD_COURSE = gql`
  mutation AddCourse(
    $name: String!
    $description: String!
    $status: CourseStatus!
    $teacherId: ID!
  ) {
    addCourse(
      name: $name
      description: $description
      status: $status
      teacherId: $teacherId
    ) {
      id
      name
      description
      status
      teacher {
        name
        email
      }
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $name: String!
    $description: String!
    $status: CourseStatusUpdate!
  ) {
    updateCourse(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id,
      name,
      description,
      status,
      teacher {
        id,
        name,
        email
      }
    }
  }
`;
