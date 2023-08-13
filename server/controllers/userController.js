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

export { login, signup, logout};
