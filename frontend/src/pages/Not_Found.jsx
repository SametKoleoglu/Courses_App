import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Not_Found = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-5 min-vh-80">
      <FaExclamationTriangle className="text-danger" size={100} />
      <h1>404</h1>
      <h1 className="text-danger mt-5">OOOOPPPPSSSSSSS !!! Page Not Found</h1>
      <Link to="/" className="btn btn-warning mt-5">
        Back to Home
      </Link>
    </div>
  );
};

export default Not_Found;
