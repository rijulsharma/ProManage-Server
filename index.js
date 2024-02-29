import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";
import profileRoutes from "./routes/profile.js";
import analyticsRoutes from "./routes/analytics.js";
import sharedRoutes from "./routes/shared.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/task", taskRoutes);
app.use("/profile", profileRoutes);
app.use("/shared", sharedRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect222222`));
