import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { boardById, createBoard } from "../controllers/boards.controllers";

const router = Router();

router.post("/create", isAuthenticated, createBoard);
router.get("/:id", isAuthenticated, boardById);

export default router;
