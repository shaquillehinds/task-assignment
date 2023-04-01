import mongoose from "mongoose";

const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

TaskSchema.index({ title: "text", completed: 1 });

const Task = mongoose.model("Task", TaskSchema);

export default Task;
