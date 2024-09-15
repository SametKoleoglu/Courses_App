import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TEACHERS } from "../graphql/Query";
import { Loading, TeacherRow } from "../components/index";

const Teacher = () => {
  const { loading, error, data } = useQuery(GET_TEACHERS);
  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {!loading && !error && data && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.teachers.map((teacher, index) => (
              <TeacherRow key={index} teacher={teacher} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Teacher;
