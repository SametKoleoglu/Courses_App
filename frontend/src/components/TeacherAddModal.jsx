import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_TEACHER } from "../graphql/Mutations/TeacherMutations";
import { GET_TEACHERS } from "../graphql/Query";
import Loading from "./Loading";

const TeacherAddModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [addTeacher, { loading }] = useMutation(ADD_TEACHER, {
    variables: { name, email },
    refetchQueries: [{ query: GET_TEACHERS }],
    onCompleted: () => {
      alert("Teacher added !!!");
      setName("");
      setEmail("");
    },
  });

  if (loading) return <Loading />;

  function handleSubmit(e) {
    e.preventDefault();

    if (name === "" || email === "") {
      return alert("Please fill in all fields");
    }

    addTeacher();
  }
  return (
    <div className="text-center my-5">
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#addTeacherModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Teacher</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addTeacherModal"
        aria-labelledby="addTeacherModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTeacherModalLabel">
                Add Teacher
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <button type="submit" className="btn btn-primary mt-2">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAddModal;
