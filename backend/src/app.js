import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import colors from "colors";
import cors from "cors";

// LOCALE DEFINITIONS
import schema from "./schema/schemas.js";
import { connectDB } from "./config/db.js";


// .ENV
dotenv.config();
const PORT = process.env.PORT || 4800;

const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ⚡️✨`.magenta.underline);
});
