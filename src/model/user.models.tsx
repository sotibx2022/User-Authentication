import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  userVerificationToken: {
    type: String,
    default: null,
  },
  userVerificationTokenExpiry: {
    type: Date,
    default: null,
  },
  forgetPasswordToken: {
    type: String,
    default: null,
  },
  forgetPasswordTokenExpiry: {
    type: Date,
    default: null,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);


