import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", CourseSchema);
