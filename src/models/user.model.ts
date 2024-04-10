import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessage: boolean;
  isVerified: boolean;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/,
      message: "Email is invalid",
    },
    password: { type: String, required: [true, "Password is required"] },

    verifyCode: { type: String, required: [true, "Verify code is required"] },

    verifyCodeExpiry: {
      type: Date,
      required: [true, "Verify code expiry date is required"],
    },

    isVerified: { type: Boolean, default: false },

    isAcceptingMessage: { type: Boolean, default: true },

    messages: [messageSchema],
  },
  { timestamps: true }
);

const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default User;
