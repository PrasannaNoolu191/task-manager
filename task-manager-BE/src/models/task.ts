import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  id: number;
  title: string;
  description?: string;
  dueDate: Date;
  status: "Pending" | "In Progress" | "Completed";
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ITask>("Task", TaskSchema);
