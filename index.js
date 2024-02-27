import express from "express";
const router = express.Router();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/task.js";
import profileRoutes from "./routes/profile.js";
import analyticsRoutes from "./routes/analytics.js";
import sharedRoutes from "./routes/shared.js";





// import { register, login } from "./controllers/auth.js";
// import { createPost, getFeedPosts, getUserPosts, likePost } from "./controllers/posts.js";
// import { getUser, getUserFriends, addRemoveFriend} from "./controllers/users.js";
// import { verifyToken } from "./middleware/auth.js";

// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */




dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* ROUTES WITH FILES */
// router.post("/auth/register", upload.single("picture"), register);
// router.post("/posts", verifyToken, upload.single("picture"), createPost);

// /* ROUTES */
// // router.use("/auth", authRoutes);
// router.post("/auth/login", login);

// // router.use("/users", userRoutes);
// router.get("/users/:id", verifyToken, getUser);
// router.get("/users/:id/friends", verifyToken, getUserFriends);
// router.patch("/users/:id/:friendId", verifyToken, addRemoveFriend);

// // router.use("/posts", postRoutes);
// router.get("/posts", verifyToken, getFeedPosts);
// router.get("/posts/:userId/posts", verifyToken, getUserPosts);
// router.patch("/posts/:id/like", verifyToken, likePost);


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

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect222222`));
