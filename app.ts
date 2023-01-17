import express from "express";
import cors from "cors";

import authRoutes from "./api/routes/auth.routes";
import profileRoutes from "./api/routes/profile.routes";
import userBoardsRoutes from "./api/routes/userBoards";
import boardsRoutes from "./api/routes/boards.routes";
import tasksRoutes from "./api/routes/tasks.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/user-boards", userBoardsRoutes);
app.use("/api/v1/boards", boardsRoutes);
app.use("/api/v1/tasks", tasksRoutes);
export default app;
