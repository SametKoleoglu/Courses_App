import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_COURSE } from "../graphql/Mutations/CourseMutations";
import { GET_COURSES } from "../graphql/Query";

const CourseDelete = ({ courseId }) => {
  const navigate = useNavigate();
  const [deleteCourse] = useMutation(DELETE_COURSE, {
    variables: { id: courseId },
    onCompleted: () => {
      navigate("/");
    },
    refetchQueries: [{ query: GET_COURSES }],
  });

  return (
    <div className="align-items-center justify-content-center">
      <button className="btn btn-sm btn-danger" onClick={deleteCourse}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CourseDelete;
