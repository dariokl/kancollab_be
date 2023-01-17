import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { createTask, updateTask } from "../controllers/tasks.controllers";

const router = Router();

router.post("/create", isAuthenticated, createTask);
router.put("/update", isAuthenticated, updateTask);

export default router;
