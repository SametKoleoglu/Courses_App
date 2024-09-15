import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { GET_COURSE } from "../graphql/Query";
import { Loading, CourseDelete, CourseEdit } from "../components/index";
import { FaEnvelope, FaIdBadge, FaPen } from "react-icons/fa";

const CourseDetails = () => {
  const [show, setShow] = useState(false);

  const { loading, error, data } = useQuery(GET_COURSE, {
    variables: { id: useParams().id },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    !loading &&
    !error &&
    data && (
      <div className="container my-5" style={{ minHeight: "60vh" }}>
        <h1 className="text-center text-info">Course Details</h1>
        <div className="mx-auto w-75 card p-5 d-flex flex-row justify-content-between mb-5">
          <div className="d-flex flex-column gap-3">
            <h1>Course Name : {data.course.name}</h1>
            <h4>Course Description : {data.course.description}</h4>
            <h5 className="mt-3">Course Status : {data.course.status}</h5>
          </div>
          <div className="d-flex flex-column gap-3">
            <h1>Teacher Details</h1>
            <ul className="list-group">
              <li className="list-group-item">
                <FaIdBadge /> {data.course.teacher.name}
              </li>
              <li className="list-group-item">
                <FaEnvelope /> {data.course.teacher.email}
              </li>
            </ul>
          </div>
          <div className=" align-items-center justify-content-center">
            <FaPen
              className="text-warning align-self-center mb-4 float-end"
              style={{ cursor: "pointer" }}
              onClick={() => setShow(!show)}
              size={18}
            />
            <CourseDelete courseId={data.course.id} />
          </div>
        </div>
        {show && <CourseEdit course={data.course} setShow={setShow} />}
      </div>
    )
  );
};

export default CourseDetails;
