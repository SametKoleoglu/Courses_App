import React from "react";
import { CourseCard, Loading } from "../components/index";
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../graphql/Query";

const Courses = () => {
  const { loading, error, data } = useQuery(GET_COURSES);
  if (loading) return <Loading />;
  if (error) return <p className="text-danger text-center">Error</p>;

  return (
    <div className="flex row justify-content-center gap-5">
      {!loading && !error && data && data.courses.length > 0 ? (
        data.courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))
      ) : (
        <div className="text-center font-weight-bold mt-5 text-danger">
          <h2>No Course Found!</h2>
        </div>
      )}
    </div>
  );
};

export default Courses;
