import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_AUTHORIZED } from "../graphql/Mutations/AuthorizedMutations";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Loading } from "../components";

const Signup = () => {
  const navigate = useNavigate();
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [addAuthorized, { loading, error }] = useMutation(ADD_AUTHORIZED, {
    variables: { email, password },
    update(proxy, result) {
      navigate("/signin");
    },
    onCompleted: () => {
      setEmail("");
      setPassword("");
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      return alert("Please fill in all fields !!!");
    }

    addAuthorized();
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-danger text-center">Error : {error.message}</p>;
  }

  return (
    <div className="container my-5" style={{ minHeight: "75vh" }}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Sign Up</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="form-label" htmlFor="email">
                EMAIL
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label className="form-label" htmlFor="password">
                PASSWORD
              </label>
              <div className="d-flex">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="align-items-center px-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
