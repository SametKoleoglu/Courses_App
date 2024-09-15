import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import isStrongPassword from "validator/lib/isStrongPassword.js";
import bcrypt from "bcrypt";

const AuthorizedSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      validate: isEmail,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 20,
      validate: isStrongPassword,
    },
  },
  {
    timestamps: true,
  }
);

// Eklenmeden hemen önce çalışacak olan fonksiyon
AuthorizedSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("Authorized", AuthorizedSchema);
