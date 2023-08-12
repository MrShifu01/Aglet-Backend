import express from "express";
const router = express.Router();
import { login, signup, logout, getUserData } from "../controllers/userController.js";

router.get("/:id", getUserData);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

export default router;
