import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import movieRoutes from './routes/movieRoutes.js'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;
connectDB()

app.use('/api/movies', movieRoutes);

app.listen(8000, () => {
    console.log(`Server is listening on port ${PORT}`);
    }
);