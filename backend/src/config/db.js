import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE_URL)
      .then((res) => {
        console.log(`Connected to the database 😎 : ${res.connection.host}`.yellow.bold );
      })
      .catch((error) => {
        console.error("Error connecting to the database: ", error.message);
      });
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);

    // Optional: You can handle the error or rethrow it for further processing
    throw new Error("Database connection failed");
  }
};
