import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { getMyBoards } from "../controllers/userBoard.controllers";

const router = Router();

router.get("/my-boards", isAuthenticated, getMyBoards);

export default router;
