import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TEACHERS, GET_COURSES } from "../graphql/Query";
import { ADD_COURSE } from "../graphql/Mutations/CourseMutations";
import { FaList } from "react-icons/fa";

const CourseAdd = () => {
  const { loading, error, data } = useQuery(GET_TEACHERS);

  // STATES
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [teacherId, setTeacherId] = useState("");

  const [addCourse] = useMutation(ADD_COURSE, {
    variables: { name, description, status, teacherId },
    refetchQueries: [{ query: GET_COURSES }],
    onCompleted: () => {
      setName("");
      setDescription("");
      setStatus("active");
      setTeacherId("");
    },
  });

  function onSubmit(e) {
    e.preventDefault();

    if (
      name === "" ||
      description === "" ||
      status === "" ||
      teacherId === ""
    ) {
      alert("Please fill in all fields");
    } else {
      addCourse();
    }
  }

  return (
    <>
      {!loading && !error && (
        <div className="text-center my-5">
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#addCourseModal"
          >
            <div className="d-flex align-items-center gap-2">
              <FaList className="icon" />
              <div>Add Course</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addCourseModal"
            aria-labelledby="addCourseModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addCourseModalLabel">
                    Course
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-4">
                      <label className="form-label">Course Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Course Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Course Status</label>
                      <select
                        className="form-select"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">In Active</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Course Teacher</label>
                      <select
                        className="form-select"
                        id="teacherId"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Teacher
                        </option>
                        {data.teachers.map((teacher, index) => (
                          <option key={index} value={teacher.id}>
                            {teacher.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                    >
                      ADD
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAdd;
