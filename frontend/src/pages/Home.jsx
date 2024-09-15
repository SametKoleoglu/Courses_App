import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_AUTHORIZED } from "../graphql/Query";
import { decodeToken } from "react-jwt";

import { TeacherAddModal, Teacher, Courses, CourseAdd } from "../components";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const meId = decodeToken(token);

  let id;

  if (meId != null) {
    id = meId.id
  }

  useQuery(GET_AUTHORIZED, {
    variables: { id },
    onCompleted: (data) => {
      if (data.authorized === null) {
        navigate("/signup");
      }
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/signup");
    }
    if(id === undefined) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="container" style={{ minHeight: "80vh" }}>
      <TeacherAddModal />
      <Teacher />
      <hr />
      <CourseAdd />
      <Courses />
    </div>
  );
};

export default Home;
