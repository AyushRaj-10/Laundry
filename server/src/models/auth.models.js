/* This code snippet is defining a Mongoose schema for a user in a Node.js application. Here's a
breakdown of what each part is doing: */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);