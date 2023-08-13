import express from "express";
const router = express.Router();
import { login, signup, logout, addFavourite, removeFavourite } from "../controllers/userController.js";
import User from "../models/userModel.js";
// import { protect } from "../middleware/authMiddleware.js";

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

// Add movie to user's favourites
router.put("/:id/add", addFavourite)

// Remove movie from user's favourites
router.put("/:id/remove", removeFavourite)


export default router;
