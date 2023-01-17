import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { getMyprofile } from "../controllers/profile.controllers";

const router = Router();

router.get("/me", isAuthenticated, getMyprofile);

export default router;
