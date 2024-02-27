import express from "express";
import { verifyToken } from "../middleware/JwtAuth.js";
import { createTask, deleteTask, editTask, getBacklogTasks, getToDoTasks, getDoneTasks, getInProgressTasks } from "../controllers/tasks.js";

const router = express.Router();

router.post("/create", verifyToken , createTask);

router.delete("/delete", verifyToken , deleteTask);

router.patch("/edit", verifyToken , editTask );

router.get("/:id/backlog/:days", verifyToken, getBacklogTasks);
router.get("/:id/todo/:days", verifyToken, getToDoTasks);
router.get("/:id/progress/:days", verifyToken, getInProgressTasks);
router.get("/:id/done/:days", verifyToken, getDoneTasks);

export default router;
