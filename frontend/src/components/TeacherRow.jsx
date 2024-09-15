import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_TEACHER } from "../graphql/Mutations/TeacherMutations";
import { GET_TEACHERS } from "../graphql/Query";

const TeacherRow = ({ teacher }) => {

     const[deleteTeacher] = useMutation(DELETE_TEACHER, {
          variables: { id: teacher.id },
          refetchQueries: [{query: GET_TEACHERS}]
     });

  return (
    <tr>
     <td>#</td>
      <td>{teacher.id}</td>
      <td>{teacher.name}</td>
      <td>{teacher.email}</td>
      <td>
        <button className="btn btn-sm btn-danger" onClick={deleteTeacher}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default TeacherRow;
