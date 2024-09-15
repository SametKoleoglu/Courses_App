import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { AUTHORIZED_SIGNIN } from "../graphql/Mutations/AuthorizedMutations";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Loading } from "../components";

const Signin = () => {
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [authorizedSignin, { error, loading }] = useMutation(
    AUTHORIZED_SIGNIN,
    {
      variables: { email, password },
      update(proxy, result) {
        window.location.assign("/");
      },
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage(null); // Yeni hata mesajını sıfırlıyoruz.

    if (email === "" || password === "") {
      return setErrorMessage("Please fill in all fields.");
    }

    try {
      const authorized = await authorizedSignin();
      const token = authorized?.data?.authorizedSignin?.token;

      if (!token) {
        return setErrorMessage("Failed to sign in. Please try again.");
      }

      localStorage.setItem("token", JSON.stringify(token));
    } catch (err) {
      console.error(err);
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="container my-5" style={{ minHeight: "75vh" }}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Sign In</h5>
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )}
            <div className="my-4">
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
            <div className="my-4">
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
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
