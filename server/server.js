import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import movieRoutes from './routes/movieRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;
connectDB()


// Parser Middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    credentials:true,
    origin: ['http://localhost:3000', '*']
}))

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes)

app.listen(8000, () => {
    console.log(`Server is listening on port ${PORT}`);
    }
);