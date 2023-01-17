import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import {
  createUser,
  login,
  refreshToken,
} from "../controllers/auth.controllers";

const router = Router();

export default router;
