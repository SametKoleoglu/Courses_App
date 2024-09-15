import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHORIZED } from "../graphql/Query";
import { decodeToken } from "react-jwt";
import logo from "../assets/logo.png";

const Header = () => {
  const [signin, setSignin] = useState(false);

  const token = localStorage.getItem("token");

  const meId = decodeToken(token);

  let id;
  if (meId != null) id = meId.id;

  useQuery(GET_AUTHORIZED, {
    variables: { id },
    onCompleted: (data) => {
      if (data.authorized === null) {
        setSignin(false);
      } else setSignin(true);
    },
  });

  function handleSignout() {
    setSignin(false);
    localStorage.removeItem("token");
    window.location.reload();
  }

  useEffect(() => {
    if (!token) {
      setSignin(false);
    }
    if (id === undefined) {
      setSignin(false);
    }
  }, []);

  return (
    <nav className="navbar bg-light mb-5 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div className="align-self-center">Course App</div>
          </div>
        </a>
        {!signin && (
          <div className="d-flex">
            <a href="/signin" className="navbar-brand">
              Sign In
            </a>
            <a href="/signup" className="navbar-brand">
              Sign Up
            </a>
          </div>
        )}

        {signin && (
          <div className="d-flex">
            <a href="/signin" className="navbar-brand" onClick={handleSignout}>
              Sign Out
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
