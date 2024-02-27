import express from "express";
import { verifyToken } from "../middleware/JwtAuth.js";
import { updateProfile } from "../controllers/profile.js";

const router = express.Router();

router.patch("/update", verifyToken , updateProfile);

export default router;
