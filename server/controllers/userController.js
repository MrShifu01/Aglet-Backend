import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
  
    const user = await User.findOne({ email });
  
    // Check if the password matches the hashed password stored in the database
    const passOk = user && bcrypt.compareSync(password, user.password);
  
    if (passOk) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        email: user.email,
        favourites: user.favourites,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  

// @desc Register user
// @route POST /api/users
// @access Public
const signup = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    } else {
        const user = await User.create({
            email,
            password:bcrypt.hashSync(password, salt)
        })

        if (user) {
            generateToken(res, user._id)
            res.status(201).json({
                _id: user._id,
                email: user.email,
                favourites: user.favourites
            })
        } else {
            res.status(400).json({message: "Invalid user data"})
        }    
    }
})

// @desc Logout user
// @route POST /api/users/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
    });

    res.status(200).json({
      message: "User logged out",
    });
  });

// @desc Add Movie to User favourites
// @route PUT /api/users/:id/add
// @access Private
const addFavourite = asyncHandler(async (req, res) => {
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
})

// @desc Remove Movie to User favourites
// @route PUT /api/users/:id/remove
// @access Private
const removeFavourite = asyncHandler(async (req, res) => {
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
})


export { login, signup, logout, addFavourite, removeFavourite};
