import mongoose, { Document, Schema } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";

interface UserDocument extends UserInterface, Document {}

const userSchema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
