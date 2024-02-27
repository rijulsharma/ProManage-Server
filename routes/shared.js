import express from "express";
import { getSharedTask } from "../controllers/shared.js";

const router = express.Router();

router.get("/:shareId", getSharedTask);

export default router;
