import mongoose, { Schema, Document } from "mongoose";
import { ITask } from "../interfaces/Task";

const TaskSchema: Schema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask & Document>("Task", TaskSchema);

export default Task;
