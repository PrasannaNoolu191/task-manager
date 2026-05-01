import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  avatar: string;
}

const UserSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("User", UserSchema);
