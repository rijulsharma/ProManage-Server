import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      max: 50,
    },
    title: {
      type: String,
      required: true,
      max: 50,
    },
    priority: {
      type: String,
      required: true,
    },
    checklist: {
      type: Array,
      required: true,
      default: [],
    },
    isDue: {
      type: Boolean,
      required: true,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    section: {
        type: String,
        required: true,
        default: "To do",
    },
    shareId: {
      type: String,
      default: null,
  },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", TaskSchema);
export default Tasks;
