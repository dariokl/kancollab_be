import { Router } from "express";
import {
  createUser,
  login,
  refreshToken,
} from "../controllers/auth.controllers";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/refreshToken", refreshToken);

export default router;
