// Import necessary modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// Function to generate a JWT and set it as an HTTP-Only cookie
const generateToken = (res, userID) => {
    // Sign the JWT with the user's ID and the secret key from environment variables
    const token = jwt.sign({userID}, process.env.JWT_SECRET);

    // Set the generated JWT as an HTTP-Only cookie on the response
    res.cookie("jwt", token, {
        httpOnly: true, // Cookie can't be accessed by JavaScript on the client side
        secure: process.env.NODE_ENV !== 'development', // Use HTTPS in environments other than development
        sameSite: 'strict', // Cookie is sent to the server only when the request originated from the same site
        maxAge: 30 * 24 * 60 * 60 * 1000 // Set cookie expiration to 30 days (in milliseconds)
    });
};

// Export the function for use in other modules
export default generateToken;
