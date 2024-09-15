import { gql } from "@apollo/client";

export const GET_TEACHERS = gql`
  query GetTeachers {
    teachers {
      id
      name
      email
    }
  }
`;

export const GET_COURSES = gql`
  query GetCourses {
    courses {
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

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      id
      name
      description
      status
      teacher {
        id
        name
        email
      }
    }
  }
`;


export const GET_AUTHORIZED = gql`
  query GetAuthorized($id: ID!) {
    authorized(id: $id) {
      id
      email
    }
  }
`