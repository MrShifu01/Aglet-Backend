import express from "express";
const router = express.Router();
import { login, signup, logout } from "../controllers/userController.js";
import User from "../models/userModel.js";
// import { protect } from "../middleware/authMiddleware.js";

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

// Add movie to user's favourites
router.put("/:id/add", async (req, res) => {
  const userId = req.params.id;
  const movieId = req.body.movieId;
  try {
    const user = await User.findById(userId);
    if (!user.favourites.includes(movieId)) {
      user.favourites.push(movieId);
      await user.save();
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to add to favourites" });
  }
});

// Remove movie from user's favourites
router.put("/:id/remove", async (req, res) => {
  const userId = req.params.id;
  const movieId = req.body.movieId;
  console.log(userId, movieId)
  try {
    const user = await User.findById(userId);
    
    // Convert the movieId to a string for comparison
    user.favourites = user.favourites.filter((id) => id.toString() !== movieId);
    await user.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error); // It's good to log the actual error for debugging
    res.status(500).json({ error: "Failed to remove from favourites" });
  }
});

export default router;
