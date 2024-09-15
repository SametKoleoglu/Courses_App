import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { IoCloseSharp } from "react-icons/io5";

import { GET_COURSES } from "../graphql/Query";
import { UPDATE_COURSE } from "../graphql/Mutations/CourseMutations";

const CourseEdit = ({ course, setShow }) => {
  const [name, setName] = useState(course.name);
  const [description, setDescription] = useState(course.description);
  const [status, setStatus] = useState(() => {
    switch (course.status) {
      case "active":
        return "active";
      case "inactive":
        return "inactive";
      default:
        throw new Error("Invalid status 🙄");
    }
  });

  const [updateCourse] = useMutation(UPDATE_COURSE, {
    variables: { id: course.id, name, description, status },
    refetchQueries: [{ query: GET_COURSES }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields !!!");
    }

    updateCourse();
  };

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between">
        <h3>Edit Course</h3>

        <IoCloseSharp
          onClick={() => setShow(false)}
          className="text-danger "
          style={{ cursor: "pointer" }}
          size={30}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label">Course Name</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Course Description</label>
          <input
            id="description"
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Course Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="btn btn-info text-white w-25">
          Update
        </button>
      </form>
    </div>
  );
};

export default CourseEdit;
