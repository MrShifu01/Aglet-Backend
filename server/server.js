// Importing required modules
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Load environment variables from a .env file
dotenv.config();

// Initialize express application
const app = express();

// Set the port from environment variable or use 8000 as default
const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Middleware: Parse incoming request cookies
app.use(cookieParser());

// Middleware: Parse incoming request body as JSON
app.use(express.json());

// Middleware: Parse incoming request URL-encoded form data
app.use(express.urlencoded({extended: true}));

// Middleware: Set CORS headers to allow requests from specified origins
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', '*']
}));

// Use movie routes for '/api/movies' endpoint
app.use('/api/movies', movieRoutes);

// Use user routes for '/api/users' endpoint
app.use('/api/users', userRoutes);

// Start the server and listen on the specified port
app.listen(8000, () => {
    console.log(`Server is listening on port ${PORT}`);
});
