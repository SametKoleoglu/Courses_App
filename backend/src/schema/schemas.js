import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

// DEFINED IN MODELS
import Course from "../models/Course.js";
import Teacher from "../models/Teacher.js";
import Authorized from "../models/Authorized.js";

// DEFINED IN GRAPHQL
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLError,
} from "graphql";

// TYPE DEFS
const TeacherType = new GraphQLObjectType({
  name: "Teacher",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const CourseType = new GraphQLObjectType({
  name: "Course",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    teacher: {
      type: TeacherType,
      resolve: (parent, args) => {
        return Teacher.findById(parent.teacherId);
      },
    },
  }),
});

const AuthorizedType = new GraphQLObjectType({
  name: "Authorized",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

// !!!! ROOT !!!!
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return Course.find();
      },
    },
    course: {
      type: CourseType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return Course.findById(args.id);
      },
    },
    teachers: {
      type: new GraphQLList(TeacherType),
      resolve: () => Teacher.find(),
    },
    teacher: {
      type: TeacherType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return Teacher.findById(args.id);
      },
    },
    authorizeds: {
      type: new GraphQLList(AuthorizedType),
      resolve: () => Authorized.find(),
    },
    authorized: {
      type: AuthorizedType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return Authorized.findById(args.id);
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //!! TEACHER PROCESSING !!!!
    addTeacher: {
      type: TeacherType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const teacher = new Teacher({
          name: args.name,
          email: args.email,
        });
        return teacher.save();
      },
    },
    deleteTeacher: {
      type: TeacherType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return Teacher.findByIdAndDelete(args.id);
      },
    },

    //!! COURSE PROCESSING !!!!
    addCourse: {
      type: CourseType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "CourseStatus",
            values: {
              active: { value: "active" },
              inactive: { value: "inactive" },
            },
          }),
          defaultValue: "active",
        },
        teacherId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const course = new Course({
          name: args.name,
          description: args.description,
          status: args.status,
          teacherId: args.teacherId,
        });
        return course.save();
      },
    },
    deleteCourse: {
      type: CourseType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return Course.findByIdAndDelete(args.id);
      },
    },
    updateCourse: {
      type: CourseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "CourseStatusUpdate",
            values: {
              active: { value: "active" },
              inactive: { value: "inactive" },
            },
          }),
        },
      },
      resolve: (parent, args) => {
        return Course.findByIdAndUpdate(args.id, args, { new: true });
      },
    },

    //!! AUTHORIZED PROCESSING !!!!
    addAuthorized: {
      type: AuthorizedType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const authorized = new Authorized({
          email: args.email,
          password: args.password,
        });
        const res = await authorized.save();

        const token = jwt.sign(
          { id: res._id, email: res.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return {
          ...res._doc,
          id: res._id,
          token,
        };
      },
    },
    deleteAuthorized: {
      type: AuthorizedType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return Authorized.findByIdAndDelete(args.id);
      },
    },
    authorizedSignin: {
      type: AuthorizedType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const authorized = await Authorized.findOne({ email: args.email });

        if (!authorized) {
          throw new GraphQLError("Authorized not found");
        }

        const isEqual = await bcrypt.compare(
          args.password,
          authorized.password
        );
        if (!isEqual) {
          throw new GraphQLError("Password is incorrect");
        }

        const token = jwt.sign(
          { id: authorized.id, email: authorized.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return {
          ...authorized._doc,
          id: authorized._id,
          token,
        };
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
